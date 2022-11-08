import React from "react";

const EventComponent: React.FC = () => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("im being dragged...");
    };
    return (
        <div>
            <input onChange={onChange} />
            <div draggable onDragStart={onDragStart}>
                Drag me!
            </div>
        </div>
    );
};

export default EventComponent;
