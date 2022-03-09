import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { uploadImage } from "../../../../firebase/uploadImage";

function CardModal(props) {
  const { isOpen, add, edit, initialValues, setIsOpen, isAddMode } = props;

  const [question, setQuestion] = useState(initialValues.question);
  const [answer, setAnswer] = useState(initialValues.answer);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuestion(initialValues.question);
      setAnswer(initialValues.answer);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (isAddMode) {
      add({ question, answer });
    } else {
      edit({ ...initialValues, question, answer });
    }
    setIsOpen(false);
  };

  const onImageChange = async (e) => {
    const image = e.target.files[0];
    setUploadingImage(true);
    uploadImage(image).then((url) => {
      setQuestion(url);
      setUploadingImage(false);
      return url;
    });
  };

  const cancelModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={cancelModal}>
        {isAddMode ? "Thêm thẻ" : "Sửa thẻ"}
      </ModalHeader>
      <ModalBody>
        <input
          type={"file"}
          name="question"
          onChange={onImageChange}
          accept="image/*"
        />
        {uploadingImage && <div>Đang tải ảnh lên...</div>}
        {question && <img src={question} alt="question" style={{width: 50, height: 50}}/>}
        <input
          type={"text"}
          name="answer"
          placeholder="Mô tả"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {isAddMode ? "Them the" : "Sua the"}
        </Button>
        <Button onClick={cancelModal}>Hủy</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CardModal;
