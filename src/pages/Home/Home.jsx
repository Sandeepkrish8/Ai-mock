import "./Home.css";
import { Link } from "react-router-dom";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { useState } from "react";

const Home = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [email, setEmail] = useState("");

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for signing up: ${email}`);
    setEmail("");
  };

  return (
    <>
    <section className="hero">

      <div className="hero-left">

        <p className="tagline">
          🚀 AI Powered Interview Preparation
        </p>

        <h1>
          Become Interview Ready
          <br />
          with <span>AI Mock Interviews</span>
        </h1>

        <p className="description">
          Practice real-world technical interviews,
          improve communication skills, and receive
          instant AI-driven feedback to boost confidence.
        </p>

        <div className="hero-buttons">
          <Link to="/practice" className="primary-btn">
            Start Practicing
          </Link>

          <Link to="/dashboard" className="secondary-btn">
            View Dashboard
          </Link>
        </div>

      </div>

      <div className="hero-right">
        <img src="https://image.lexica.art/full_webp/515d8991-f14a-4c42-a3f6-f53fcf10a2ec" alt="AI Interview Coach" className="hero-image" />
      </div>
      
      <section className="features">

  <h2>Why Choose AI Interview Coach?</h2>

  <div className="features-grid">

    <FeatureCard
      title="AI Feedback"
      description="Receive instant AI-powered feedback on your interview answers."
      image="https://image.lexica.art/full_webp/c7e35c4c-caa9-4eef-93f9-6f0479332ab4"
    />

    <FeatureCard
      title="Real Interview Questions"
      description="Practice industry-level frontend interview questions."
      image="https://image.lexica.art/full_webp/4e7dd413-766b-4c90-85ae-a7448d3f97fb"
    />

    <FeatureCard
      title="Performance Tracking"
      description="Monitor improvement using smart analytics dashboard."
      image="https://image.lexica.art/full_webp/4c6fb51a-9b84-498d-95a6-d6895cb434f9"
    />

  </div>

</section>

    </section>
  <section className="stats">
    <h2>Core Interview Tracks</h2>
    <div className="stats-grid">
      <div className="stat-box">
        <h3>Real Interview Patterns</h3>
        <p>
            Curated from commonly asked interview questions.
            Regularly updated with new questions.
          </p>
      </div>
      <div className="stat-box">
        <h3>DSA</h3>
        <p>
          Covers Data Structures & Algorithms
          Pattern Recognition,Problem Solving
          </p>
      </div>
      <div className="stat-box">
        <h3>Time and Space Complexity</h3>
        <p>
            Analyze algorithm efficiency
            Optimize code performance 
        </p>
      </div>
      <div className="stat-box">
        <h3>AI Feedback</h3>
        <p>
            Detailed evaluation of your answers
            Actionable feedback for improvement
        </p>
      </div>
    </div>
  </section>

  {/* TESTIMONIALS */}
  <section className="testimonials">
    <h2>What users say</h2>
    <div className="testimonial-grid">
      <div className="testimonial-card">
        <p className="rating">⭐⭐⭐⭐⭐</p>
        <p className="quote">"AI feedback was spot-on. Helped me crack my Google interview!"</p>
        <p className="author">— Sarah, FAANG Engineer</p>
      </div>

      <div className="testimonial-card">
        <p className="rating">⭐⭐⭐⭐⭐</p>
        <p className="quote">"Real questions, real feedback. Best prep I've done."</p>
        <p className="author">— Mike, Startup Founder</p>
      </div>

      <div className="testimonial-card">
        <p className="rating">⭐⭐⭐⭐⭐</p>
        <p className="quote">"Finally, interview prep that doesn't feel like studying!"</p>
        <p className="author">— Priya, Career Switcher</p>
      </div>
    </div>
  </section>

  {/* HOW IT WORKS VISUAL */}
  <section className="how-it-works">
    <h2>Your path to interview success</h2>
    <div className="timeline">
      <div className="timeline-step">
        <div className="step-circle">1</div>
        <h3>Choose a Topic</h3>
        <p>Pick from DSA, Frontend, or System Design problems</p>
      </div>
      <div className="timeline-arrow">→</div>
      <div className="timeline-step">
        <div className="step-circle">2</div>
        <h3>Simulate Interview</h3>
        <p>Answer questions with real conditions and time limits</p>
      </div>
      <div className="timeline-arrow">→</div>
      <div className="timeline-step">
        <div className="step-circle">3</div>
        <h3>Get AI Feedback</h3>
        <p>Instant analysis of your approach and communication</p>
      </div>
      <div className="timeline-arrow">→</div>
      <div className="timeline-step">
        <div className="step-circle">4</div>
        <h3>Track & Improve</h3>
        <p>Monitor progress and refine weak areas systematically</p>
      </div>
    </div>
  </section>

  {/* FAQ SECTION */}
  <section className="faq">
    <h2>Frequently asked questions</h2>
    <div className="faq-container">
      {[
        {
          id: 1,
          q: "How accurate is the AI feedback?",
          a: "Our AI is trained on real interview criteria from companies like Google, Amazon, and Microsoft. We validate feedback with actual hiring managers."
        },
        {
          id: 2,
          q: "Can I try for free?",
          a: "Yes! You get 3 free mock interviews per month. Premium unlocks unlimited interviews and detailed analytics."
        },
        {
          id: 3,
          q: "What topics are covered?",
          a: "We cover DSA, Frontend, Backend, System Design, and Behavioral questions. Regular updates add new questions weekly."
        },
        {
          id: 4,
          q: "How AI evaluates my answers?",
          a: "Our AI analyzes your responses based on real interview criteria, providing feedback on problem-solving, communication, and technical skills."
        }
      ].map((faq) => (
        <div key={faq.id} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleFAQ(faq.id)}
          >
            <span>{faq.q}</span>
            <span className={`toggle-icon ${expandedFAQ === faq.id ? "open" : ""}`}>
              ▼
            </span>
          </div>
          {expandedFAQ === faq.id && (
            <div className="faq-answer">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  </section>

  {/* NEWSLETTER */}
  <section className="newsletter">
    <h2>📧 Get tips and updates</h2>
    <p>Subscribe to receive interview tips, new features, and exclusive deals delivered to your inbox.</p>
    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="primary-btn">
        Subscribe
      </button>
    </form>
  </section>

    </>

    
  );
};

export default Home;