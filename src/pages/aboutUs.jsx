import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/aboutUs.css";
import FerasImg from "../images/feras.jpg";

const AboutUs = () => {
    return (
        <div className="container py-5 about-page">
            {/* Page Header */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-theme">Harvest Hub</h1>
                <p className="lead text-secondary">
                    Building connections between local farmers, vendors, and the community.
                </p>
            </div>

            {/* Mission & Vision */}
            <section className="mb-5">
                <h2 className="text-theme border-bottom border-3 pb-2 mb-3">
                    Our Mission & Vision
                </h2>
                <p className="fs-5">
                    <strong>Harvest Hub</strong> is dedicated to connecting local
                    farmers and vendors directly with customers through a modern, accessible
                    online platform. Our vision is to build a sustainable ecosystem that
                    promotes healthy living, supports local businesses, and strengthens
                    community ties.
                </p>
            </section>

            {/* Strategy */}
            <section className="mb-5">
                <h2 className="text-theme border-bottom border-3 pb-2 mb-3">Our Strategy</h2>
                <p className="fs-5">
                    We aim to <strong>improve the public's access to local vendors</strong> by
                    leveraging technology to simplify farm-to-table commerce. Our goal is to
                    empower local growers, reduce waste, and ensure fair pricing while offering
                    customers fresh, reliable, and convenient products.
                </p>
            </section>

            {/* Executives Section */}
            <section>
                <h2 className="text-theme border-bottom border-3 pb-2 mb-4 text-center">
                    Meet Our Executives
                </h2>
                <div className="row justify-content-center g-4">
                    {/* Executive 1 */}
                    <div className="col-md-3">
                        <div className="card shadow-sm border-theme text-center p-3 h-100">
                            <img
                                src="https://via.placeholder.com/150"
                                className="rounded-circle mx-auto my-3 border border-3 border-theme"
                                alt="CEO"
                                width="150"
                                height="150"
                            />
                            <h4 className="text-theme fw-bold">Emerson Frasure</h4>
                            <p className="fst-italic text-secondary">Chief Executive Officer</p>
                            <p>
                                Emerson holds an MBA in Sustainable Business from Stanford and has led
                                multiple agri-tech startups to success. With a passion for
                                sustainability, Emerson drives our mission of merging traditional
                                farming with modern commerce.
                            </p>
                        </div>
                    </div>

                    {/* Executive 2 */}
                    <div className="col-md-3">
                        <div className="card shadow-sm border-theme text-center p-3 h-100">
                            <img
                                src="https://via.placeholder.com/150"
                                className="rounded-circle mx-auto my-3 border border-3 border-theme"
                                alt="CTO"
                                width="150"
                                height="150"
                            />
                            <h4 className="text-theme fw-bold">Tim Donnelly</h4>
                            <p className="fst-italic text-secondary">Chief Technology Officer</p>
                            <p>
                                Tim brings over 10 years of experience in full-stack development
                                and cloud systems. A former engineer at a Fortune 500 firm, Tim
                                ensures our technology remains secure, scalable, and user-friendly.
                            </p>
                        </div>
                    </div>

                    {/* Executive 3 */}
                    <div className="col-md-3">
                        <div className="card shadow-sm border-theme text-center p-3 h-100">
                            <img
                                src={FerasImg}
                                className="rounded-circle mx-auto my-3 border border-3 border-theme"
                                alt="COO"
                                width="150"
                                height="150"
                            />
                            <h4 className="text-theme fw-bold">Feras Akileh</h4>
                            <p className="fst-italic text-secondary">Chief Operations Officer</p>
                            <p>
                                Feras holds a degree in Agricultural Economics from Ohio State and
                                has over a decade of experience in farm-to-table logistics. Their
                                leadership ensures efficiency and reliability across our supply chain.
                            </p>
                        </div>
                    </div>

                    {/* Executive 4 */}
                    <div className="col-md-3">
                        <div className="card shadow-sm border-theme text-center p-3 h-100">
                            <img
                                src="https://via.placeholder.com/150"
                                className="rounded-circle mx-auto my-3 border border-3 border-theme"
                                alt="COO"
                                width="150"
                                height="150"
                            />
                            <h4 className="text-theme fw-bold">Yilly Liu</h4>
                            <p className="fst-italic text-secondary">Chief Operations Officer</p>
                            <p>
                                Yilly holds a degree in Agricultural Economics from Ohio State and
                                has over a decade of experience in farm-to-table logistics. Their
                                leadership ensures efficiency and reliability across our supply chain.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AboutUs;
