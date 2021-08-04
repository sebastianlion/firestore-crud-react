import React, {useEffect, useState} from "react"
import LinkForm from './LinkForm';
import {db} from '../firebase'
import {toast} from 'react-toastify'

const Links = () => {

    // useState es para definir estado inicial de la aplicacion
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (linkObject) => {

        try {
            if(currentId === ''){
                // await es contenido en "async" entonces se tiene que colocar
                await db.collection('links').doc().set(linkObject);
                // la funcion es asincrona entonces necesitamos colocar el await
                // porque queremos que mientras se guarden los datos, se vaya ejecutando otro codigo
                // .doc es para que le agregue un id a cada uno de los items
                toast('New link added', {
                    type: 'success',
                    autoClose:2000
                })
            } else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Llink updated successfully', {
                    type: 'info',
                    autoClose:2000
                })
                setCurrentId('')
            }
        } catch (error) {
            console.error(error)
        }
        
    };

    const onDeleteLink = async (id) => {
        if(window.confirm('are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link removed successfully', {
                type: 'error',
                autoClose: 2000
            })
        }
    }

    const getLinks = async () => {
        // querySnapshot es la respuesta que da el servidor de firebase (db) así se conoce en la documentacion de firebase
        // onSnapshot se mantiene escuchando y recibe como parametro una funcion que se ejecuta cada vez que los datos cambien
        // const querySnapshot = await db.collection('links').onSnapshot((querySnapshot) => {
        //     querySnapshot.forEach(doc => {
        //         console.log(doc.data())
        //     })
        // });
        // ya no se necesita guardar en una constante ni se necesita el await porque se convirtio en un evento.
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id})
                // console.log(doc.data())
                // console.log(doc.id)
            })
            setLinks(docs)
        });
    }

    //useEffect recibe una funcion (1er parametro) y un arreglo con los datos que van cambiando (2do p)
    //se queda esperando a que cambien los datos y cada vez que cambien los datos (2p) se ejecuta la funcion (1p)
    useEffect(() => {
        getLinks();
    }, []);


    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink, currentId, links}} />
            </div>
        
            <div className="col-md-8 p-2">
            
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" 
                                    onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" 
                                    onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>

                        </div>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default Links;