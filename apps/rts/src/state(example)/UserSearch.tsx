import { useState } from "react";

// const users = [
//     { name: "Sarah", age: 20 },
//     { name: "Alex", age: 21 },
//     { name: "Michael", age: 22 },
// ];

interface User {
    name: string;
    age: number;
}

interface UserSearchProps {
    users: User[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
    const [name, setName] = useState<string>("");
    const [found, setFound] = useState<User | undefined>();
    const [error, setError] = useState<string | undefined>();

    const onClick = () => {
        const foundUser = users.find((user) => {
            return user.name == name;
        });
        if (foundUser) {
            setFound(foundUser);
            setError(undefined);
        } else {
            setFound(undefined);
            setError("User not found!");
        }
    };
    return (
        <div>
            <div>
                <h2>User Search</h2>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onClick}>Find User</button>
            <div>
                {found && "Name: " + found.name}
                {error && error}
                <br />
                {found && "Age: " + found.age}
            </div>
        </div>
    );
};

export default UserSearch;
