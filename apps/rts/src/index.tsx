import ReactDOM from "react-dom";
import Parent from "./props/Parent";
import GuestList from "./state(example)/GuestList";
import { useState } from "react";
import UserSearch from "./refs(example)/UserSearch";
import EventComponent from "./event(example)/EventComponent";

const App = () => {
    const [name, setName] = useState<string>("");
    const [guests, setGuests] = useState<string[]>([]);

    const onClick = () => {
        setName("");
        setGuests([...guests, name]);
        console.log(guests);
    };
    const users = [
        { name: "Sarah", age: 20 },
        { name: "Alex", age: 21 },
        { name: "Michael", age: 22 },
    ];
    return (
        <div>
            <UserSearch users={users} />
            <h3>
                <GuestList />
            </h3>
            <ul>
                {guests.map((guest) => (
                    <li key={guest}>{guest}</li>
                ))}
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onClick}>Add Guest</button>
            <p></p>
            <EventComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
