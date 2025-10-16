import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import BgTexture from "../images/bg-texture.jpg";
import { products } from "../data/products";
import { partners } from "../data/partners";
import "../styles/home.css";

export default function LandingPage() {

    const marketplacePreview = products.slice(0, 4); // Show first 4 products as a preview
    const partnersPreview = partners.slice(0, 3); // Show first 3 partners

    const marketplaceElements = marketplacePreview.map((item, idx) => (
        <motion.div
            key={idx}
            className="col-sm-6 col-md-4 col-lg-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
        >
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
                <img
                    src={item.image}
                    className="card-img-top marketplace-img"
                    alt={item.name}
                />
                <div className="card-body">
                    <h5 className="text-theme">{item.name}</h5>
                </div>
            </div>
        </motion.div>
    ))

    const partnersElements = partnersPreview.map((farmer, idx) => (
        <motion.div
            key={idx}
            className="col-md-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="card h-100 shadow border-0 overflow-hidden">
                <img
                    src={farmer.image}
                    className="card-img-top community-img"
                    alt={farmer.name}
                />
                <div className="card-body">
                    <h5 className="fw-bold text-theme">{farmer.name}</h5>
                    <p className="text-muted small">
                        Local partners bringing fresh goods directly to you.
                    </p>
                </div>
            </div>
        </motion.div>
    ))

    return (
        <div className="page-bg position-relative overflow-hidden">

            {/* --- Background Image Layer --- */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url(${BgTexture})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(1.05) saturate(1.1)",
                    zIndex: 0,
                }}
            />

            {/* --- HERO SECTION --- */}
            <section
                className="hero-section d-flex flex-column justify-content-center align-items-center text-center position-relative"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="hero-card p-5 rounded-4 shadow-lg"
                >
                    <motion.h1
                        className="display-4 fw-bold text-theme mb-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Fresh. Local. Digital.
                    </motion.h1>

                    <motion.p
                        className="fs-5 text-muted mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Discover your favorite local farmers from the comfort of your home, where
                        sustainability meets convenience.
                    </motion.p>

                    <motion.div
                        className="d-flex justify-content-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link to="/purchase" className="btn btn-theme btn-lg me-3">
                                Explore Market
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Link to="/aboutus" className="btn btn-outline-theme btn-lg">
                                About Us
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll down indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="scroll-indicator position-absolute"
                >
                    <span className="text-theme fw-bold">↓ Scroll</span>
                </motion.div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <motion.section
                id="about"
                className="about-section vh-100 text-center position-relative d-flex flex-column justify-content-center"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container">
                    <motion.h2
                        className="fw-bold text-theme mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Why Go Digital?
                    </motion.h2>

                    <p className="about-text fs-5 text-muted mb-5 mx-auto">
                        Our online market connects you directly to local growers ensuring
                        freshness, fair pricing, and a smaller carbon footprint.
                    </p>

                    <div className="row g-4 justify-content-center">
                        {[
                            {
                                title: "Sustainable Choices",
                                desc: "Every purchase supports eco-friendly farming.",
                                icon: "🌱",
                            },
                            {
                                title: "Local Impact",
                                desc: "Keep your money in the community and support local farmers.",
                                icon: "🏡",
                            },
                            {
                                title: "Zero Waste",
                                desc: "We prioritize minimal packaging and responsible delivery.",
                                icon: "♻️",
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                className="col-md-4"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="card shadow-sm p-4 h-100 border-0">
                                    <div className="fs-1 mb-3">{card.icon}</div>
                                    <h4 className="text-theme">{card.title}</h4>
                                    <p className="text-muted mt-2">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>


            {/* --- MARKETPLACE PREVIEW --- */}
            <motion.section
                id="market"
                className="py-5 text-center bg-light position-relative"
            >
                <motion.h2
                    className="fw-bold text-theme mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore the Digital Farmers Market
                </motion.h2>
                <p className="fs-5 text-muted mb-5">
                    Farm-fresh produce, homemade goods, and artisan crafts all in one
                    place.
                </p>

                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {marketplaceElements}
                    </div>
                </div>
            </motion.section>

            {/* --- COMMUNITY SECTION --- */}
            <section
                className="community-section py-5 text-center position-relative"
            >
                <motion.h2
                    className="fw-bold text-theme mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Meet the Growers
                </motion.h2>
                <p className="fs-5 text-muted mb-5">
                    Behind every product is a passionate farmer or maker real people
                    growing with purpose.
                </p>

                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {partnersElements}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="final-cta py-5 text-center text-white">
                <motion.h2
                    className="fw-bold mb-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Ready to Grow With Us?
                </motion.h2>
                <p className="fs-5 mb-4">
                    Join our community of sustainable shoppers and local farmers today.
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Link to="/purchase" className="btn btn-outline-light btn-lg">
                        Get Shopping
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
