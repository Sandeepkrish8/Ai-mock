import "./FeatureCard.css";

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="feature-card">
      {image && (
        <img src={image} alt={title} className="feature-img" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;