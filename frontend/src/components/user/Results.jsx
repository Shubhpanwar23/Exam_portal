import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Results(){
    const {qId}=useParams();
    let [result,setResult]=useState('');
    useEffect(()=>{
        //fetchResults();
    })
    // const fetchResults=async()=>{
    //     try{
    //         const res=await getResults();
    //         console.log(res.data);
    //         setResult(res.data);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    return(
        <>
            <h2>Result : {result}</h2>
        </>
    )
}
export default Results;