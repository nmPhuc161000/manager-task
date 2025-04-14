import { useState, useEffect, useCallback } from "react";
import { addNewCard, viewAllCards, changeCardName, deleteCard } from "../apis/card-api";
import { toast } from "react-toastify";
import { useError } from "../contexts/ErrorContext";

const useCards = (columnId) => {
    const [cards, setCards] = useState([]);
    const [newCardTitle, setNewCardTitle] = useState("");
    const [editingCardId, setEditingCardId] = useState(null);
    const [editingCardTitle, setEditingCardTitle] = useState("");
    const [addingCard, setAddingCard] = useState(false);
    const [updatingCard, setUpdatingCard] = useState(false);
    const [deletingCard, setDeletingCard] = useState(false);
    const [hasError, setHasError] = useState(false); // Trạng thái để kiểm tra xem đã thêm lỗi chưa

    const { addError } = useError();

    const fetchCards = useCallback(async () => {
        try {
            const response = await viewAllCards();
            if (response.error === 0) {
                const columnCards = response.data.filter((card) => card.columnId === columnId);
                setCards(columnCards);
                setHasError(false);
            } else {
                throw new Error(response.message || "Không thể tải danh sách nhiệm vụ!"); // Dòng 40
            }
        } catch (error) {
            if (!hasError) {
                addError(error.message);
                setHasError(true);
            }
            throw error;
        }
    }, [columnId, addError, hasError]);

    useEffect(() => {
        if (columnId) {
            fetchCards().catch((error) => {
                console.error("Error in fetchCards:", error.message);
            });
        }
    }, [columnId, fetchCards]);

    const handleAddCard = async () => {
        if (!newCardTitle.trim()) {
            toast.error("Tiêu đề nhiệm vụ không được để trống!");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
            return;
        }

        setAddingCard(true);
        try {
            const response = await addNewCard({
                userId,
                columnId,
                title: newCardTitle,
            });
            if (response.error === 0) {
                toast.success("Thêm nhiệm vụ thành công!");
                setNewCardTitle("");
                setCards([...cards, response.data]);
            } else {
                if (response.message === "User not found") {
                    toast.error("Người dùng không tồn tại. Vui lòng đăng nhập lại!");
                } else {
                    toast.error(response.message || "Không thể thêm nhiệm vụ!");
                }
            }
        } catch (error) {
            if (error.message.includes("token")) {
                toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
            } else {
                toast.error(error.message || "Đã xảy ra lỗi khi thêm nhiệm vụ!");
            }
        } finally {
            setAddingCard(false);
        }
    };

    const startEditingCard = (card) => {
        setEditingCardId(card.id);
        setEditingCardTitle(card.title);
    };

    const cancelEditingCard = () => {
        setEditingCardId(null);
        setEditingCardTitle("");
    };

    const handleUpdateCard = async (cardId) => {
        if (!editingCardTitle.trim()) {
            toast.error("Tiêu đề nhiệm vụ không được để trống!");
            return;
        }

        setUpdatingCard(true);
        try {
            const response = await changeCardName({
                id: cardId,
                title: editingCardTitle,
            });
            if (response.error === 0) {
                toast.success("Cập nhật nhiệm vụ thành công!");
                setCards(
                    cards.map((card) =>
                        card.id === cardId ? { ...card, title: editingCardTitle } : card
                    )
                );
                setEditingCardId(null);
                setEditingCardTitle("");
            } else {
                toast.error(response.message || "Không thể cập nhật nhiệm vụ!");
            }
        } catch (error) {
            if (error.message.includes("token")) {
                toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
            } else {
                toast.error(error.message || "Đã xảy ra lỗi khi cập nhật nhiệm vụ!");
            }
        } finally {
            setUpdatingCard(false);
        }
    };

    const handleDeleteCard = async (cardId) => {
        setDeletingCard(true);
        try {
            const response = await deleteCard(cardId);
            if (response.error === 0) {
                toast.success("Xóa nhiệm vụ thành công!");
                setCards(cards.filter((card) => card.id !== cardId));
            } else {
                toast.error(response.message || "Không thể xóa nhiệm vụ!");
            }
        } catch (error) {
            if (error.message.includes("token")) {
                toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
            } else {
                toast.error(error.message || "Đã xảy ra lỗi khi xóa nhiệm vụ!");
            }
        } finally {
            setDeletingCard(false);
        }
    };

    return {
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
    };
};

export default useCards;