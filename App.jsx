import { useEffect, useState } from "react";
import "./App.css";

function App() {

const [rooms,setRooms]=useState([]);

const [roomNumber,setRoomNumber]=useState("");
const [type,setType]=useState("");
const [price,setPrice]=useState("");
const [status,setStatus]=useState("");

const loadRooms=()=>{
fetch("http://localhost:5000/rooms")
.then(res=>res.json())
.then(data=>setRooms(data));
}

useEffect(()=>{
loadRooms();
},[]);

const addRoom=async()=>{

await fetch("http://localhost:5000/rooms",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
roomNumber,
type,
price,
status
})
});

setRoomNumber("");
setType("");
setPrice("");
setStatus("");

loadRooms();

}

return (

<div className="container">

<div className="overlay">

<h1>🏨 Luxury Hotel Management</h1>

<div className="form">

<input
placeholder="Room Number"
value={roomNumber}
onChange={(e)=>setRoomNumber(e.target.value)}
/>

<input
placeholder="Room Type"
value={type}
onChange={(e)=>setType(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option>Available</option>
<option>Occupied</option>
<option>Cleaning</option>

</select>

<button onClick={addRoom}>
Add Room
</button>

</div>

<h2>Available Rooms</h2>

<table>

<thead>

<tr>

<th>Room</th>
<th>Type</th>
<th>Price</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{
rooms.map(room=>(

<tr key={room.id}>

<td>{room.roomNumber}</td>
<td>{room.type}</td>
<td>₹{room.price}</td>
<td>{room.status}</td>

</tr>

))
}

</tbody>

</table>

<div className="cards">

<div className="card">
🛏 Room Booking
</div>

<div className="card">
✔ Check-In
</div>

<div className="card">
💳 Billing
</div>

<div className="card">
👤 Guest Profiles
</div>

</div>

</div>

</div>

)

}

export default App;