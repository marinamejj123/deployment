import React, {useEffect, useRef, useState} from 'react';
import {Xwrapper} from 'react-xarrows';
import Box from "../figures/Box";
import Arrow from "../figures/Arrow";
import {useLocation, useHistory, Redirect} from "react-router-dom";
import DB from "../firebase/FirestoreProvider";
import Modal from "./Modal";
import UseAuth from "../middlewares/UseAuth";
import ReactToPrint  from 'react-to-print';
import FileSaver from "file-saver";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

function BoardPage(props) {
    const location = useLocation();
    const history = useHistory();
    const auth = UseAuth();
    console.log(location)
    if (location.state === undefined) {
        history.replace('/')
    }

    const [board, setBoard] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    const [boxes, setBoxes] = useState([]);
    const [arrows, setArrows] = useState([]);

    const [action, setAction] = useState({});
    const [selected, setSelected] = useState({});
    const [showOptions, setShowOptions] = useState({box: false, arrow: false});
    const [modalActions, setModalActions] = useState({participants: false, delete: false});

    const componentRef = useRef();
    useEffect(() => {
        if(board===undefined) history.replace('/');
        else if (Object.entries(board).length !== 0)
            if (!board.participantsEmail.includes(auth.user.email)) history.replace('/');
            else setIsOwner(board.ownerId === auth.user.uid);
    }, [board]);


    useEffect(() => {
        if (board!==undefined && Object.entries(board).length === 0) {
            DB.getBoard(setBoard, location.state.boardId);
            DB.initBoxes(setBoxes, location.state.boardId)
            DB.initArrows(setArrows, location.state.boardId)
        }
    }, [board]);







    const boxProps = {
        showOptions,
        setShowOptions,
        action,
        setAction,
        selected,
        setSelected,
        arrows,
        setArrows,
    }
    const arrowProps = {
        showOptions,
        setShowOptions,
        selected,
        setSelected,
        setAction
    }

    function nexBoxId() {
        let id = 'box-0'
        if (boxes.length === 0) return id;
        else {
            const lastBox = boxes[boxes.length - 1];
            const lastNumber = Number((lastBox.id.split('-'))[1]) + 1;
            return 'box-' + lastNumber;
        }
    }

    const handleDropDynamic = (e) => {
        let boxType = e.dataTransfer.getData('shape');
        let {x, y} = e.target.getBoundingClientRect();
        let newBox = {
            id: nexBoxId(), x: e.clientX - x, y: e.clientY - y, boxType: boxType,
            title: 'título', content: 'descripción', docId: 0,
        };
        DB.createBox(location.state.boardId, newBox);
        setBoxes([...boxes, newBox]);
    };
    class ComponentToPrint extends React.PureComponent {
  
  

  
  
        render() {
          return (
            //<div>funciona por favor</div>
            <div className='w-full relative overflow-x-hidden bg-yellow-50'>
            <Xwrapper>
            <div className={"w-4 h-96 p-2"}
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={handleDropDynamic}>
                        {boxes.map(box => {
                            return <Box key={box.id} id={box.id} boxType={box.boxType} posX={box.x} posY={box.y}
                                        {...boxProps} title={box.title} content={box.content} docId={box.docId}/>
                        })}
                        {arrows.map((arrow, index) => {
                            return <Arrow key={index} id={arrow.id} start={arrow.start} end={arrow.end}
                                          dotted={arrow.dotted}
                                          {...arrowProps} label={arrow.label} docId={arrow.docId}/>
                        })}
            </div>
            </Xwrapper>
        </div>
            
          );
        }
      
      
    }

 

   
    return (
        <div className={'flex min-h-screen'}>
            <div className={'w-48 border border-4 shadow-xl p-5 flex flex-col justify-between'}>
                <div className={'w-2/5 bg-white h-120 shadow-xl p-5 pt-10'}>
                    <div className={'rounded text-white flex flex-col justify-center items-center'}
                         onDragStart={(e) => e.dataTransfer.setData('shape', 'person')}
                         draggable={'true'}>
                        <div className={'rounded-full w-10 h-10 bg-blue-900'}></div>
                        <div className={'rounded w-full bg-blue-900 p-5 -mt-2 text-center'}>Person</div>
                    </div>

                    <div className={'rounded w-28 p-5 border-2 bg-grey text-white'}
                         onDragStart={(e) => e.dataTransfer.setData('shape', 'system')}
                         draggable={'true'}>Software System
                    </div>

                    <div className={'rounded p-5 border-2 bg-blue-500 text-white'}
                         onDragStart={(e) => e.dataTransfer.setData('shape', 'container')}
                         draggable={'true'}>Container 
                    </div>
                    <div className={'db text-center p-5'}
                         onDragStart={(e) => e.dataTransfer.setData('shape', 'database')}
                         draggable={'true'}>
                        <p className={'tex-center text-black'}>Database</p>
                    </div>

                    <div className={'rounded p-5 border-2 bg-blue-400 text-white'}
                         onDragStart={(e) => e.dataTransfer.setData('shape', 'component')}
                         draggable={'true'}>Component
                    </div>

                </div>


                <div className={'space-y-2 flex flex-col'}>
                    <button className={'border rounded block my-5 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-300'}
                            onClick={e => setModalActions({
                                participants: true,
                                delete: false
                            })}><img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/null/external-users-user-tanah-basah-glyph-tanah-basah-3.png"/>
                                {'Participantes'}</button>

              
                    <button className={'border rounded block my-5 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-300'}
                            onClick={e => setModalActions({
                                pdf: true,
                                delete: false
                            })}><img src="https://img.icons8.com/fluency/48/null/image-file.png"/>
                                {'Generar Pdf'}</button>

                    <button className={'border rounded block my-5 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-300'}
                            onClick={e => {
                                history.push('/board-sw1')
                            }}><img src="https://img.icons8.com/fluency/48/null/exit.png"/>
                                {'Salir'}</button>
                    {isOwner &&
                    <button className={'border rounded block my-5 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-300'}
                            onClick={e => setModalActions({
                                participants: false,
                                delete: true
                            })}><img src="https://img.icons8.com/fluency/48/null/delete-property.png"/>
                                {'Eliminar'}</button>
                    }
                </div>
            </div>

            


            <div className={'w-full relative overflow-auto bg-yellow-50'}>
                <Xwrapper>

                    <div className={'w-full h-full p-2'}
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={handleDropDynamic}>
                        {boxes.map(box => {
                            return <Box key={box.id} id={box.id} boxType={box.boxType} posX={box.x} posY={box.y}
                                        {...boxProps} title={box.title} content={box.content} docId={box.docId}/>
                        })}
                        {arrows.map((arrow, index) => {
                            return <Arrow key={index} id={arrow.id} start={arrow.start} end={arrow.end}
                                          dotted={arrow.dotted}
                                          {...arrowProps} label={arrow.label} docId={arrow.docId}/>
                        })}
                    </div>
                </Xwrapper>
            </div>

            {showOptions.box && (<div className={'w-48 border border-4 shadow-xl p-2'}>
                <p className={'text-md font-medium text-center uppercase'}>{selected.id}</p>
                <div className={'w-full h-0.5 bg-gray-200'}/>

                <div className={'space-y-2 mt-5'}>
                    <div>
                        <label>{'Título'}</label>
                        <input className={'w-full border'} type="text" value={selected.title}
                               onChange={e => update(e, 'box', 'title')}/>
                    </div>
                    <div>
                        <label>{'Descripción'}</label>
                        <textarea className={'w-full border'} value={selected.content}
                                  onChange={e => update(e, 'box', 'content')}/>
                    </div>
                </div>
                <p className={'text-md font-medium text-center mt-8 uppercase'}>{'Flechas'}</p>
                <div className={'w-full h-0.5 bg-gray-200'}/>


                <button className={'block'} onClick={e => {
                    setAction({name: 'addArrow', options: {dotted: false}})
                }}>{"->"}
                </button>
                <button className={'block'} onClick={e => {
                    setAction({name: 'addArrow', options: {dotted: true}})
                }}>{"---->"}
                </button>

                <button className={'border-2 w-full mt-8 bg-gray-300'}
                        onClick={e => DB.deleteBox(location.state.boardId, selected.docId,selected.id)}>{'Eliminar'}</button>
                <button className={'border-2 w-full mt-8 bg-gray-300'} onClick={e => setShowOptions({})}>{'Cerrar'}</button>

            </div>)}

            {showOptions.arrow && (<div className={'w-48 border border-4 shadow-xl p-2'}>
                <p className={'text-md font-medium text-center uppercase'}>{selected.id}</p>
                <div className={'w-full h-0.5 bg-gray-200'}/>
                <div className={'mt-5'}>
                    <label>Nombre</label>
                    <input className={'w-full border'} type="text" value={selected.label}
                           onChange={e => update(e, 'arrow', 'label')}/>
                </div>

                <div className={'mt-2'}>
                    <label>Conector</label>
                    <select className={'w-full'} onChange={e => update(e, 'arrow', e.target.value)}>
                        <option value="normal"> {"->"} </option>
                        <option value="dotted"> {"--->"} </option>
                    </select>
                </div>

                <button className={'border-2 w-full mt-8 bg-gray-300'}
                        onClick={e => DB.deleteArrow(location.state.boardId, selected.docId)}>{'Eliminar'}</button>

                <button className={'border-2 w-full mt-8 bg-gray-300'}
                        onClick={e => setShowOptions({box: false, arrow: false})}>{'Cerrar'}</button>

            </div>)}

            {modalActions.delete &&
            <Modal title={'Eliminar Tablero'} setModal={setModalActions} value={{participants: false, delete: false}}>
                <div className={'p-5 space-y-10'}>
                    <p>{'¿Estas seguro que quieres eliminar este tablero?'}</p>
                    <div className={'flex justify-end space-x-2'}>
                        <button className={'rounded p-2 hover:shadow-lg bg-gray-300 text-black font-medium'}
                                onClick={e => setModalActions({participants: false, delete: false})}>{'Cerrar'}</button>

                        <button className={'rounded p-2 hover:shadow-lg bg-red-500 text-white font-medium'}
                                onClick={e => {
                                    DB.deleteBoard(location.state.boardId).then(() => {
                                        history.push('/board-sw1')
                                    })
                                }}>{'Eliminar'}</button>

                    </div>

                </div>

                <div className={'flex justify-center'}>
                </div>
            </Modal>}

            {modalActions.participants &&
            <Modal title={'Participantes'} setModal={setModalActions} value={{participants: false, delete: false}}>
                <div className={'p-5 space-y-10'}>
                    {isOwner && <form className={'flex space-x-2'}
                                      onSubmit={e => {
                                          e.preventDefault();
                                          DB.addParticipant(e.target.email.value, location.state.boardId)
                                      }}>
                        <input className={'w-full'} type="text" name={'email'} placeholder={'Correo del participante'}/>
                        <button
                            className={'rounded p-2 hover:shadow-lg bg-gray-500 text-white font-medium'}>{'Agregar'}</button>
                    </form>}
                    <div className={'space-y-2'}>
                        {board.participantsEmail.map((email, index) => {
                            return <div key={index} className={'flex space-x-2 items-center justify-center'}>
                                <p className={'w-full block border-2 p-1.5 rounded text-gray-600 font-medium'}>{email}</p>
                                {isOwner &&
                                <button className={'rounded p-2 hover:shadow-lg bg-red-500 text-white font-medium'}
                                        onClick={e => DB.removeParticipant(email, location.state.boardId)}>{'Eliminar'}</button>}
                            </div>
                        })}
                    </div>


                </div>
                


            </Modal>}
         
            
            {modalActions.pdf &&
            
            <Modal title={'Exportar PDF'} setModal={setModalActions} value={{pdf: false, delete: false}}>
              
  <div>
      <ReactToPrint
        trigger={() => <button>Click Aqui para Imprimir!</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>
    <div>
    <React.Fragment>
      <ComponentToPrint ref={componentRef} />
      
      <button onClick={() => exportComponentAsPNG(componentRef)}>
        Export As jpng
      </button>
    </React.Fragment>

    </div>
  

            </Modal>}
           
        
    </div>
    );

    function update(e, type, toUpdate) {
        if (type === 'box') {
            let updated = [...boxes];
            const position = updated.findIndex((element) => selected.id === element.id);
            const value = toUpdate === 'title' ? {title: e.target.value} : {content: e.target.value};
            updated.splice(position, 1, {...updated[position], ...value});
            setSelected({...selected, ...value});
            //DB.updateBox(location.state.boardId, selected)
            DB.updateBox(location.state.boardId, updated[position])
            setBoxes(updated);

        } else {
            let updated = [...arrows];
            const position = updated.findIndex((element) => selected.id === element.id);

            let value;
            switch (toUpdate) {
                case 'dotted':
                    value = {dotted: true}
                    break;
                case 'normal':
                    value = {dotted: false}
                    break;
                case 'label':
                    value = {label: e.target.value}
                    break;
                default:
                    //value = {dotted: false};
                    break;
            }
            updated.splice(position, 1, {...updated[position], ...value});
            setSelected({...selected, ...value});
            DB.updateArrow(location.state.boardId, updated[position])
            setArrows(updated);
        }
    }
}

export default BoardPage;

