import React, { Component } from 'react'
import {Container, Row,Card,Button , Col} from 'react-bootstrap'
export default class Student extends Component {
    state={
        student:[]
    }
    componentDidMount = async () => {
        const student = await fetch("http://localhost:3333/student/")
        const stud = await student.json()
       
       
        console.log(stud)
        this.setState({
            student: stud

        })
        console.log(this.state.student)
    //    window.location.reload()
    }
render() {
        return (
            <>
            <Container>
 <Row  >
          
           
          {this.state.student.map(students=>
         
           <Col lg={3}>
           <Card >
           <Card.Img variant="top" style={{borderRadius: "120px"}} src="data:image/jpeg;base64,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" />
           <Card.Body>
          <Card.Title>{students.name}</Card.Title>
          <Card.Title>{students.surname}</Card.Title>
          <Card.Title>{students.email}</Card.Title>
          <Card.Title>{students.dateOfBirth}</Card.Title>
             <Button variant="primary">Go somewhere</Button>
             

           </Card.Body>
           </Card>
           </Col>
       
            )  }
        
          </Row>
         </Container>
       </>
        )
    }
}
