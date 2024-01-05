// import React from "react";

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from "react-bootstrap/esm/Button";
// import Figure from 'react-bootstrap/Figure';

// function CartItem(props){
//         const [quant,setQuant]=useState(props.count);

//         function increamentCount(){
//             setItemCount(itemCount+1)
//             setQuant((prevQuant)=>{
//                 var newQuant=prevQuant+1;
                
//                 fetch('http://localhost:3001/api/updateCart',{
//                     method:'post',
//                     headers:{
//                         'content-type':'application/json'
//                     },
//                     body:JSON.stringify({id:props.id,quantity:newQuant})
//                 })
//                 return newQuant;
//             })
//         }
//         function decreamentCount(){
//             setItemCount(itemCount-1);
//             setQuant((prevQuant)=>{
//                 if(prevQuant>1){
//                     var newQuant=prevQuant-1;
//                     fetch('http://localhost:3001/api/updateCart',{
//                         method:'post',
//                         headers:{
//                             'content-type':"application/json"
//                         },
//                         body:JSON.stringify({id:props.id,quantity:newQuant})
//                     });
//                     return newQuant;
//                 }
//                 return prevQuant;
//             })
//         }
//         async function removeProduct(){
//             setItemCount(itemCount-props.count);
//             const id=props.id;
//             try {
//                 await fetch('http://localhost:3001/api/deleteProduct',{
//                     method:"DELETE",
//                     headers:{
//                         'content-type':"application/json"
//                     },
//                     body:JSON.stringify({id})
//                 }).then(async data=>{
//                     var parseData=await data.json();
//                     console.log(parseData);
//                     setProducts(parseData);
//                 })
//             } catch (error) {
//                 console.log(error);
//             }
//         }

   
        
//         return (
//             <>
//             <Row className="justify-content-md-center cartProduct">
//                 <Col lg="2" md="1" sm={4} xs={6} className="content" style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)' }}>{props.ind}</Col>
//                 <Col lg="1" md="2" sm={4}  xs={6} className="content cartImage"><Figure>
//                 <Figure.Image width={100} height={100} xs={6}  alt="171x180" src={props.img} ></Figure.Image></Figure></Col>
//                 <Col lg="2" md="3" sm={4}  xs={6} className="content" style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)' }}>{props.name}</Col>
//                 <Col lg="2" md="2" sm={4}  xs={6} className="content" style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)' }}>{props.cost}</Col>
//                 <Col lg="2" md="2" sm={4}  xs={6} className="content" style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)',fontSize:"x-large" }}>
//                 <Button variant="light" value={props.id} style={{fontSize:"large"}} onClick={()=>{decreamentCount()}}>-</Button>{' '}
//                 {quant}
//                 <Button variant="light" value={props.id} style={{fontSize:"large"}} onClick={()=>{increamentCount()}}>+</Button>{' '}</Col>
//                 <Col lg="2" md="2" sm={4}  xs={6} className="content"  style={{ backgroundColor: props.ind % 2 === 0 ? 'rgb(250, 241, 228)': 'rgb(206, 222, 189)' }}>
//                 <Button variant="danger" value={props.id} onClick={()=>{removeProduct()}}>Remove</Button>{' '}</Col>
//             </Row>
//         </>
//         )
//     }



// export default CartItem;