import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Blog = () => {
    return (
        <section className='blog my-100'>
            <Container>
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>Q1. How will you improve the performance of a React Application?</h3>
                            <p className='mt-3'>There are many ways to optimize react apps like memoizing react components to avoid re-render. Also, keeping component state local. Then, if the application renders if long list we can use the technique of windowing which renders a small subset of rows at a given time. We can also use lazy loading images to prevent the creation of unnecessary DOM nodes to boost performance. And, there is a way if you are using webpack 4 then in module set mode option to production which tells webpack to use built-in optimization.</p>
                        </div>
                        <div className='mt-5'>
                            <h3>Q2. What are the different ways to manage a state in a React application?</h3>
                            <p className='mt-3'>There are four types of state (Local state, Global stare, Server state, URL state) that need to be properly managed in React app. Local state is managed in one or another component which is often managed in the useState hook. The local state could be shown or hide modal. The global state is needed across multiple components like authenticated user state. Server state which comes from an external server to integrated into the UI state. It's hard to manage but there are tools like React query to make it easy. URL state exists on URL include query parameters.</p>
                        </div>
                        <div className='mt-5'>
                            <h3>Q3. How does prototypical inheritance work?</h3>
                            <p className='mt-3'>To add methods and properties in objects can be used Prototypal inheritance of JavaScript features. By this method, can inherit properties and methods from another object. So, mainly these features allow us to reuse the properties and methods. This feature does have some limitations like objects can not inherit from multiple prototypes. Prototypical relationships can only be made with objects.</p>
                        </div>
                        <div className='mt-5'>
                            <h3>Q4. Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h3>
                            <p>setProducts() will replace previous value in state. setProducts is asynchronous. React components get re-rendered whenever the state changed. But, if you want to merge the previous value and updated value you must use the callback syntax of state updating along with the correct use of spread syntax. So, we don't want to merge previous value in products that's why we don't use the spread operator.</p>
                        </div>
                        <div className='mt-5'>
                            <h3>Q5. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h3>
                            <p className='mt-3'>Let's make a function as searchProduct and pass product and search query(product name) as parameters. Let's take empty as an array as result. Now, loop on products and inside that if product.name.includes(searchQuery) then push the product on that empty array. Call the function where you need it and pass the parameters as well. That's how we can get the product by name.</p>
                        </div>
                        <div className='mt-5'>
                            <h3>Q6. What is a unit test? Why should write unit tests?</h3>
                            <p className='mt-3'>Unit test to ensure a unit or components of application meets its design and behaves intended. For a unit test, a unit could be an individual function, method, procedure, module, or object. Unit testing helps to fix bugs in the development cycle and save costs. Also, helps with code re-use. So, the unit test helps developers to understand the testing code base and enables them to make changes quickly.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Blog;