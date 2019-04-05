import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Home.css";
import { API } from "aws-amplify";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isDeleting: null,
      isEditing: null,
      notes: []
    };
  }

  async componentDidMount() {

    try {
      const notes = await this.notes();

      this.setState({
        notes
      });
    } catch (e) {
      alert(e);
      }

    this.setState({ isLoading: false });
  }
  async componentWillUpdate() {
    try {
      const notes =  await this.notes();

      this.setState({
        notes
      });
    } catch (e) {
      alert(e);
      }
      this.setState({ isLoading: false });

  }

  deleteNote(id) {
  return API.del("notes", `/notes/${id}`);
  }

  handleDelete = (i) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });

  try {
    this.deleteNote(i);
  } catch (e) {
    alert(e);
    this.setState({ isDeleting: false });
    }

    this.setState({ isLoading: false,
    isDeleting: false });
  }

  notes() {
    return API.get("notes", "/notes");
  }

  renderNotesList(notes) {
     return [{}].concat(notes).map(
       (note, i) =>
        i !== 0
        ?
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
              <Row>
                <Col sm={10}>
                 {"Created: " + new Date(note.createdAt).toLocaleString()}
                </Col>
                <Col sm={1}>
                      Edit
                </Col>
                <Col sm={1}>
                    <LoaderButton
                    key={note.noteId}
                    block
                    bsStyle="danger"
                    bsSize="large"
                    isLoading={this.state.isDeleting}
                    onClick={this.handleDelete.bind(this, note.noteId)}
                    text="Delete"
                    loadingText="Deleting…"
                    className="glyphicon glyphicon-trash"
                    >Delete</LoaderButton>
                </Col>
              </Row>
            </ListGroupItem>

        : <LinkContainer
            key="new"
            to="/notes/new"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
  );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
   }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
