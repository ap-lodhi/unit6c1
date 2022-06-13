import React from 'react'
const ProducForm = () => {
 const [inputValue , SetInputValue] =React.useState("");
 const [choice , SetChoice] =React.useState("");
 const [price , SetPrice] =React.useState("");
 const [cate , SetCate] =React.useState("");
 const [data , setData]=React.useState([]);
 const [loading ,setLoading] =React.useState(false);
 const [error, setError] =React.useState(false);
 const [page,setPage] =React.useState(1)

 

const getProduct= () =>{
    setLoading(true);
    fetch(` http://localhost:3000/data ` )
        .then((res) => res.json())
        .then((res) => {
            setData(res);
        })
        .catch((err) => {
            setError(true);
            setData([]);
        })
        .finally(()=>{
            setLoading(false);
        })

};
 
React.useEffect(() =>{

getProduct();
} ,[page])

 

    function save(){
        const payload ={
            title:inputValue,
            gender:choice,
            price:price,
            category:cate
        }
        fetch(` http://localhost:3000/data?_page=${page}&_limit=5 `, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                getProduct();
            });
              
            

    }

    if(loading){
        return <h1>Loading...</h1>;
    }
    if(error){
        return <h1>Error .. Somthing Went Wrong..</h1>
    }
    return (
        <div id='card'> 
            <h1>Product form</h1>

            <input placeholder='Product Name '
             value={inputValue}
             onChange={(e) => SetInputValue(e.target.value)} />
            <br/>
            <select name="choic" value={choice }
              onChange= {(e) => SetChoice(e.target.value)}>
                <option value="first" >gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input placeholder='Enter Price' 
             value={price}
             onChange={(e) => SetPrice(e.target.value)}/>

            <br/>
            <input placeholder='Category ' 
             value={cate}
             onChange={(e) => SetCate(e.target.value)}/>
            <br/>
                <img src='https://i.picsum.photos/id/737/200/200.jpg?hmac=YPktyFzukhcmeW3VgULbam5iZTWOMXfwf6WIBPpJD50' alt='loading..'/>
                        
            <br/>
            <button onClick={save}>submit </button>
            
                
            {data.map((item) =>(
                <>
        <h1 key={item.id}>{item.title}</h1>
        <h1 key={item.id}>{item.gender}</h1>
        <h1 key={item.id}>{item.price}</h1>
        <h1 key={item.id}>{item.category}</h1>
        
                </>
               
        
    ))}
            <button onClick={()=> setPage(page-1)} disabled={page ===1}>previous</button>
    <button onClick={()=> setPage(page+1)}>next</button>
        </div>
    )
}
export default ProducForm;