import React from 'react';
import authProvider from "../firebase/AuthProvider";

function HomePage(props) {


    return (
        
        /*
        <div className={'min-h-screen flex justify-center items-center transparent'}>
            

          
            <div className={'w-2/5 bg-white h-120 shadow-xl p-5 pt-10'}>
                <h1 className={'text-3xl font-medium text-center'}>{'Pencil'}</h1>
                <h2 className={'text-sm font-medium'}>{'Diagramas C4: '}</h2>
                <div className={'flex justify-center items-center h-full'}>
                <button className={'border rounded block my-7 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-600'} onClick={e=>authProvider.login()}>
                    <img src="https://img.icons8.com/parakeet/48/null/home.png"/>
                    <span>{'Iniciar sesión'}</span>
                </button>
                </div>
               
                
            </div>
            
        
            <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://raw.githubusercontent.com/SixLabors/Branding/main/icons/imagesharp.drawing/sixlabors.imagesharp.drawing.512.png" alt="Background" />
             </div>
        

        </div>*/
        
        <div class="w-full flex flex-wrap">

        
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <img src="https://img.icons8.com/cotton/64/null/pencil-eraser--v1.png"/>
            </div>

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">PENCIL</p>
                <p class="text-center text-3xl">Bienvenido</p>
               
                <div className={'flex justify-center items-center h-full'}>
                    
                <button className={'border rounded block my-7 inline-flex space-x-2 p-2 hover:shadow-lg bg-blue-100'} onClick={e=>authProvider.login()}>
                    <img src="https://img.icons8.com/parakeet/48/null/home.png"/>
                    <span>{'Iniciar sesión'}</span>
                </button>
                </div>
            </div>

        </div>
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" alt="Background" />
             </div>
        </div>

       
        

    );
}

export default HomePage;
