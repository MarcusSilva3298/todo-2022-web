import './styles.css'
import { Button, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface ITodo {
  id: string
  title: string
  description?: string
  done: boolean
}

interface ICreateTodo {
  title: string
  description?: string
}

export function Home () {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [newTodo, setNewTodo] = useState<ICreateTodo>({ title: 'title', description: 'description' })

  const handleOnChange = (e: any) => {
    const { name, value } = e.target

    setNewTodo({ ...newTodo, [name]: value})
  }

  const checkOnChange = (e:any) => {
    console.log(e.target)

    const { value, id } = e.target

    api.patch(`/${id}`, {
      done: value === '1' ? false : true
    })
    .then(() => window.location.reload())
  }

  const createTodo = (e: any) => {
    e.preventDefault()

    const { title, description } = newTodo

    api.post('/', {
      title,
      description
    }).then(() => {
      window.location.reload();
    })
  }

  const deleteTodo = (e: any) => {
    e.preventDefault()

    const { id } = e.target

    api.delete(`/${id}`)
      .then(() => window.location.reload())
  }

  useEffect(() => { 
    api.get('/')
      .then((response) => { setTodos(response.data) })
    }, []
  )

  return (
    <Container className="Home">
      <Row className="justify-content-center">
        <Col lg={10} className="form-container">

          <Form
            className="form"
            onSubmit={createTodo}
          >
            <Row className="justify-content-between align-items-center">
              <Form.Label className="form-label">Add new todo</Form.Label>
            </Row>

            <Row className="mt-1">
              <Col lg={4}>
                <Form.Control onChange={handleOnChange} name='title' placeholder={newTodo.title} required/>
              </Col>
              <Col lg={7}>
                <Form.Control onChange={handleOnChange} name='description' placeholder={newTodo.description}/>
              </Col>
              <Col lg={1} className="col-button">
                <Button className="form-button" variant="success"type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>

        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col lg={10} className="todos-container">

          {/* <Form className="form">
            <Row>
              <Col lg={9}>
                <Form.Control placeholder="Search" />
              </Col>
              <Col lg={2}>
                <Form.Select defaultValue="Title">
                  <option>Title</option>
                  <option>Description</option>
                </Form.Select>
              </Col>
              <Col lg={1} className="col-button">
                <Button className="search-button" variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form> */}

          <Col className="todos">
              {
                todos.map((todo) => {
                  return (
                    <Row key={todo.id} className="list-item justify-content-between align-items-center">
                      <Col lg={6}>
                        <p className='title'>{todo.title}</p>
                        <p className='description'>{todo.description}</p>
                      </Col>
                      <Col lg={6}>
                        <Row className="justify-content-end">
                          <Col lg={2}>
                            <ToggleButton
                              id={todo.id}
                              variant={todo.done ? 'success' : 'outline-success'}
                              type="checkbox"
                              value={todo.done ? 1 : 2}
                              onChange={checkOnChange}
                            >
                              Done
                            </ToggleButton>
                          </Col>
                          <Col lg={2}>
                            <Button id={todo.id} variant="danger" type="button" onClick={deleteTodo}>
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )
                })
              }
          </Col>
        </Col>
      </Row>


    </Container>
  )
}