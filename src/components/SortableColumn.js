import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash, faEllipsisV, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import useCards from "../hooks/useCards";

const SortableColumn = ({ column, index, handleCopyColumn, handleDeleteColumn, onLoaded }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column.id });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);

    const {
        cards,
        fetchCards,
        newCardTitle,
        setNewCardTitle,
        addingCard,
        handleAddCard,
        editingCardId,
        editingCardTitle,
        setEditingCardTitle,
        updatingCard,
        startEditingCard,
        cancelEditingCard,
        handleUpdateCard,
        deletingCard,
        handleDeleteCard,
    } = useCards(column.id);

    // Báo cáo khi cột đã tải xong (dù thành công hay thất bại)
    useEffect(() => {
        fetchCards()
            .then(() => {
                onLoaded(); // Gọi callback khi tải thành công
            })
            .catch(() => {
                onLoaded(); // Gọi callback khi tải thất bại
            });
    }, [fetchCards, onLoaded]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest(".list-actions")) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMenuOpen]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        transformOrigin: "0 0",
        ...(isDragging && {
            zIndex: 1000,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#e2e4e9",
            transform: `${CSS.Transform.toString(transform)} rotate(3deg)`,
        }),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="list-card"
        >
            <div className="list-header">
                <h4
                    className="list-title"
                    {...listeners}
                    style={{ cursor: "grab" }}
                >
                    {column.title}
                </h4>
                <div className="list-actions">
                    <button
                        className="menu-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                    >
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <button
                                onClick={() => {
                                    handleCopyColumn(column.id);
                                    setIsMenuOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                <FontAwesomeIcon icon={faCopy} /> Copy
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteColumn(column.id);
                                    setIsMenuOpen(false);
                                }}
                                className="dropdown-item delete-item"
                            >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="tasks">
                {cards.length > 0 ? (
                    cards.map((task) => (
                        <div key={task.id} className="task-card">
                            {editingCardId === task.id ? (
                                <div className="edit-card-form">
                                    <input
                                        type="text"
                                        value={editingCardTitle}
                                        onChange={(e) => setEditingCardTitle(e.target.value)}
                                        disabled={updatingCard}
                                    />
                                    <div className="edit-card-actions">
                                        <button
                                            onClick={() => handleUpdateCard(task.id)}
                                            className="save-btn"
                                            disabled={updatingCard}
                                        >
                                            {updatingCard ? "Đang lưu..." : "Lưu"}
                                        </button>
                                        <button
                                            onClick={cancelEditingCard}
                                            className="cancel-btn"
                                            disabled={updatingCard}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span>{task.title}</span>
                                    <div className="task-actions">
                                        <button
                                            onClick={() => startEditingCard(task)}
                                            className="edit-btn"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCard(task.id)}
                                            className="delete-btn"
                                            disabled={deletingCard}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-tasks">Không có nhiệm vụ</div>
                )}
            </div>
            <div className="add-card-section">
                {isAddingCard ? (
                    <div className="add-card-form">
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề nhiệm vụ..."
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            disabled={addingCard}
                        />
                        <div className="add-card-actions">
                            <button
                                onClick={handleAddCard}
                                className="add-card-btn"
                                disabled={addingCard}
                            >
                                {addingCard ? "Đang thêm..." : "Thêm"}
                            </button>
                            <button
                                onClick={() => setIsAddingCard(false)}
                                className="cancel-btn"
                                disabled={addingCard}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAddingCard(true)}
                        className="add-card-toggle"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Thêm nhiệm vụ
                    </button>
                )}
            </div>
        </div>
    );
};

export default SortableColumn;