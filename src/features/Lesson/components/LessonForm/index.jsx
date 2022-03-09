import React, { useState } from "react";
import { Button } from "reactstrap";

import CardModal from "../CardModal";

function LessonForm(props) {
  const { onSubmit, initialValues, isAddMode } = props;
  const [title, setTitle] = useState(initialValues.title || "");
  const [cards, setCards] = useState(initialValues.cards || []);

  const [showModal, setShowModal] = useState(false);
  const [initialModal, setInitialModal] = useState({});
  const [isAddModeModal, setIsAddModeModal] = useState(true);

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  const editCard = (card) => {
    const newCards = cards.map((c, i) => {
      if (i === card.index) {
        return card;
      }
      return c;
    });
    setCards(newCards);
  };

  const handleEditCard = (index) => {
    setShowModal(true);
    setInitialModal({...cards[index], index});
    setIsAddModeModal(false);
  }

  const handleAddCard = () => {
    setShowModal(true);
    setInitialModal({question: '', answer: ''});
    setIsAddModeModal(true);
  }

  const handleDeleteCard = (index) => {
    const newCards = cards.filter((card, i) => {
      return i !== index;
    });
    setCards(newCards);
  }

  const handleSubmit = async () => {
    await onSubmit({...initialValues, title, cards});
  }

  return (
    <div className="lesson-form">
      <div style={{'padding': 10}}>
        <label htmlFor='title' style={{'paddingRight': 5}}>Tên bài học: </label>
        <input type="text" name='title' value={title} onChange={(e) => {setTitle(e.target.value)}} />
      </div>
      {cards.map((card, index) => (
        <div key={index} className='lesson-card'>
          <div className="lesson-card-question">
            <label htmlFor='question'>Câu hỏi: </label>
            <img src={card.question} alt='question' id='question' style={{width: 300, height: 300}}/>
          </div>
          <div className="lesson-card-answer">
            <span id='answer'>{card.answer}</span>
          </div>
          <button onClick={() => handleEditCard(index)} >Sửa thẻ</button>
          <button onClick={() => handleDeleteCard(index)}>Xóa thẻ</button>
        </div>
      ))}

      <Button color="primary" onClick={handleAddCard}>
        Thêm thẻ mới
      </Button>

      <CardModal isOpen={showModal} setIsOpen={setShowModal} add={addCard} edit={editCard} initialValues={initialModal} isAddMode={isAddModeModal}/>

      <Button color="primary" onClick={handleSubmit}>{isAddMode ? 'Tạo bài học' : 'Cập nhật bài học'}</Button>

    </div>
  );
}

export default LessonForm;
