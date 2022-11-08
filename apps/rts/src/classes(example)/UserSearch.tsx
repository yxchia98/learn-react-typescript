import { Component } from "react";

interface User {
    name: string;
    age: number;
}
interface UserSearchProps {
    users: User[];
}

interface UserSearchState {
    name: string;
    found: undefined | User;
    error: undefined | string;
}

class UserSearch extends Component<UserSearchProps> {
    state: UserSearchState = {
        name: "",
        found: undefined,
        error: undefined,
    };

    onClick = () => {
        const foundUser = this.props.users.find((user) => {
            return user.name == this.state.name;
        });
        if (foundUser) {
            this.setState({ found: foundUser });
            this.setState({ error: undefined });
        } else {
            this.setState({ found: undefined });
            this.setState({ error: "User not found!" });
        }
    };

    render() {
        const { name, found, error } = this.state;
        return (
            <div>
                <div>
                    <h2>User Search</h2>
                </div>
                <input
                    value={name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                />
                <button onClick={this.onClick}>Find User</button>
                <div>
                    {found && "Name: " + found.name}
                    {error && error}
                    <br />
                    {found && "Age: " + found.age}
                </div>
            </div>
        );
    }
}

export default UserSearch;
