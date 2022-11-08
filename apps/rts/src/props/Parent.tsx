import { ChildAsFC } from "./Child";

const Parent = () => {
    const sayHello = () => {
        console.log("Hello World!");
    };
    return (
        <ChildAsFC color="red" onClick={sayHello}>
            asdasd
        </ChildAsFC>
    );
};

export default Parent;
