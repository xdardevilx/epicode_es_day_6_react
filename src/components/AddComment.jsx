import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { keyAPI } from "../data/const";

const AddComment = (props) => {
  const commentObj = {
    comment: "",
    rate: 1,
    elementId: props.asin,
  };
  const [comment, setComment] = useState(commentObj);

  useEffect(() => {
    setComment(() => ({
     ...comment,
      elementId: props.asin,
    }));
  }, [props]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization: keyAPI,
          },
        }
      );
      if (response.ok) {
        alert("Recensione inviata!");
        setComment(commentObj);
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) => setComment({ ...comment, rate: e.target.value })}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
