import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SortableColumn from "./SortableColumn";
import { useError } from "../contexts/ErrorContext";

const BoardColumns = ({
    localColumns,
    setLocalColumns,
    columns,
    loadingColumns,
    addingColumn,
    newColumnTitle,
    setNewColumnTitle,
    handleAddColumn,
    handleMoveColumn,
    handleCopyColumn,
    handleDeleteColumn,
}) => {
    const { showErrors, resetErrors } = useError();
    const [loadedColumns, setLoadedColumns] = useState(0); // Theo dõi số lượng cột đã tải xong

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const onDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = localColumns.findIndex((column) => column.id === active.id);
        const newIndex = localColumns.findIndex((column) => column.id === over.id);

        const updatedColumns = Array.from(localColumns);
        const [movedColumn] = updatedColumns.splice(oldIndex, 1);
        updatedColumns.splice(newIndex, 0, movedColumn);
        setLocalColumns(updatedColumns);

        const columnId = active.id;
        const newPosition = newIndex;
        handleMoveColumn(columnId, newPosition).catch(() => {
            setLocalColumns(columns);
        });
    };

    // Hàm để tăng số lượng cột đã tải xong
    const handleColumnLoaded = () => {
        setLoadedColumns((prev) => prev + 1);
    };

    // Hiển thị thông báo lỗi sau khi tất cả cột đã tải xong
    useEffect(() => {
        if (loadedColumns === localColumns.length && localColumns.length > 0) {
            showErrors();
        }
    }, [loadedColumns, localColumns.length, showErrors]);

    // Reset errors khi localColumns thay đổi (ví dụ: khi tải lại trang)
    useEffect(() => {
        resetErrors();
        setLoadedColumns(0); // Reset số lượng cột đã tải
    }, [localColumns, resetErrors]);

    return (
        <div className="board-details-content">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={localColumns.map((column) => column.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="lists-container">
                        {loadingColumns ? (
                            <div>Đang tải cột...</div>
                        ) : (
                            <>
                                {localColumns.map((column, index) => (
                                    <SortableColumn
                                        key={column.id}
                                        column={column}
                                        index={index}
                                        handleCopyColumn={handleCopyColumn}
                                        handleDeleteColumn={handleDeleteColumn}
                                        onLoaded={handleColumnLoaded} // Truyền callback để báo cột đã tải xong
                                    />
                                ))}
                                <div className="add-list">
                                    <input
                                        type="text"
                                        placeholder="Nhập tiêu đề cột..."
                                        value={newColumnTitle}
                                        onChange={(e) => setNewColumnTitle(e.target.value)}
                                        disabled={addingColumn}
                                    />
                                    <button
                                        onClick={handleAddColumn}
                                        className="add-list-btn"
                                        disabled={addingColumn}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />{" "}
                                        {addingColumn ? "Đang thêm..." : "Thêm cột"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default BoardColumns;