import React from 'react';
import Dropdown from '../components/DropDown'; // Import the Dropdown component
import "../styles/contactUs.css";

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <div className="contact-banner">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-info-section">
                <h2>Get In Touch</h2>
                <p className="contact-intro">
                    Have a question about your order or need help with a return? We're here to help. <br />
                    Reach out to us through one of the options below.
                </p>
                <div className="contact-cards-container">
                    {/* Card 1: Email */}
                    <div className="contact-card">
                        <i className="fas fa-envelope contact-icon"></i>
                        <h3>Email Support</h3>
                        <p>For questions about orders, products, or to initiate a return.</p>
                        <a href="mailto:support@yourfarm.com" className="contact-link">support@yourfarm.com</a>
                    </div>

                    {/* Card 2: Phone */}
                    <div className="contact-card">
                        <i className="fas fa-phone-alt contact-icon"></i>
                        <h3>Phone Support</h3>
                        <p>For all inquiries, including urgent issues or help with returns.</p>
                        <span className="contact-link">(555) 123-4567</span>
                    </div>
                </div>
            </div>
            <div className="faqs-section">
                <h2>Frequently Asked Questions</h2>
                <Dropdown title="What are your shipping options?">
                    <p>
                        We currently offer a Standard Shipping option to ensure your products arrive fresh.
                    </p>
                    <ul>
                        <li><strong>Delivery Zone:</strong> We ship to all addresses within a 100-mile radius of our farm to maintain the quality of our perishable goods. Please enter your zip code at checkout to confirm if you are within our delivery zone.</li>
                        <li><strong>Shipping Costs:</strong> A flat rate of $9.99 is applied to all orders. We offer free shipping for all orders over $75.</li>
                        <li><strong>Delivery Times:</strong> Orders are typically processed within 24 hours. Deliveries are made Tuesday through Friday. You can expect your order to arrive within 2-3 business days after it has been processed. You will receive a confirmation email with tracking information once your order is on its way.</li>
                    </ul>
                </Dropdown>

                <Dropdown title="How fresh are the products?">
                    <p>
                        Freshness is the cornerstone of our business. We operate on a "harvest-to-order" model for most of our produce, meaning your items are often still in the field when you place your order.
                    </p>
                    <p>
                        Our process ensures you receive products at their peak quality:
                    </p>
                    <ol style={{ paddingLeft: '20px' }}>
                        <li>We harvest our produce daily based on incoming orders.</li>
                        <li>Your order is carefully packed in insulated packaging with cold packs to maintain optimal temperature during transit.</li>
                        <li>We ship it out as quickly as possible, minimizing the time from our farm to your table.</li>
                    </ol>
                    <p>
                        This commitment to freshness means you are getting goods that are significantly fresher than those found in a typical grocery store.
                    </p>
                </Dropdown>

                <Dropdown title="Can I change my delivery address?">
                    <p>
                        If you need to change the delivery address for an order, please contact us as soon as possible.
                    </p>
                    <ul>
                        <li><strong>If your order has not yet been processed or shipped:</strong> We can usually update the address for you. Please call us directly at (555) 123-4567 for the fastest service, or email us at support@yourfarm.com with "Urgent: Address Change" in the subject line.</li>
                        <li><strong>If your order has already shipped:</strong> Unfortunately, we are unable to change the delivery address once an order is in transit with our shipping carrier.</li>
                    </ul>
                    <p>
                        We recommend double-checking your address at checkout to ensure a smooth delivery.
                    </p>
                </Dropdown>

                <h2>Support & Returns</h2>
                <Dropdown title="What is your return policy?">
                    <p>
                        Our goal is your complete satisfaction. However, due to the perishable nature of many of our products, we have a specific return policy.
                    </p>
                    <strong>Non-Returnable Items:</strong>
                    <p>
                        Most of our items, including all fresh produce and food products, are non-returnable. This is to ensure the safety and quality of our goods for all our customers. We cannot accept returns for items purchased in excess or by mistake.
                    </p>
                    <strong>Returnable Items:</strong>
                    <p>
                        Non-perishable goods (such as canned items, merchandise, or other designated products) may be eligible for return. <strong>Eligible items will be clearly marked as "Returnable" on their respective product page.</strong>
                    </p>
                    <strong>Conditions for Returnable Items:</strong>
                    <ul>
                        <li>You must contact us to initiate a return within <strong>30 days</strong> of the purchase date.</li>
                        <li>Items must be unused, unopened, and in their original packaging.</li>
                        <li>A valid receipt or proof of purchase is required for all returns.</li>
                    </ul>
                    <p>
                        To start a return for an eligible item, please contact us at <strong>support@yourfarm.com</strong> or call us at <strong>(555) 123-4567</strong> with your order number.
                    </p>
                </Dropdown>

                <Dropdown title="How do I report an issue with my order?">
                    <p>
                        Please inspect your order as soon as it arrives. If you receive an item that is damaged, defective, or incorrect, please contact us <strong>immediately</strong> so we can make it right.
                    </p>
                    <p>
                        <strong>To help us resolve the issue quickly, please provide the following:</strong>
                    </p>
                    <ul>
                        <li>Your order number.</li>
                        <li>A description of the issue.</li>
                        <li>A clear photo of the damaged or incorrect item, including its packaging.</li>
                    </ul>
                    <p>
                        We will evaluate the issue and work with you to find a satisfactory solution, which may include a replacement or a refund for the affected item.
                    </p>
                </Dropdown>
            </div>
        </div>
    );
};

export default ContactUs;