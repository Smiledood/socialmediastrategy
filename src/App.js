import React, { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "filesaver.js";

function App() {
  const [formData, setFormData] = useState({
    business: "",
    goal: "",
    audience: "",
    problem: "",
    unique: "",
    contentType: "",
    platforms: "",
    products: "",
    niche: "",
    logo: null,
  });
  const [errors, setErrors] = useState({}); // New state for tracking errors

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      // Clear error for this field when user starts typing
      if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: false });
      }
    }
  };

  const generatePDF = () => {
    // List of required fields (excluding logo, which is optional)
    const requiredFields = [
      "business",
      "goal",
      "audience",
      "problem",
      "unique",
      "contentType",
      "platforms",
      "products",
      "niche"
    ];

    // Check for missing fields
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    // If there are errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and generate PDF if all fields are filled
    setErrors({});
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Your Social Media Strategy", 10, y);
    y += 10;

    if (formData.logo) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        doc.addImage(imgData, "PNG", 10, y, 50, 50);
        finishPDF(doc, y + 60);
      };
      reader.readAsDataURL(formData.logo);
    } else {
      finishPDF(doc, y + 10);
    }
  };

  const finishPDF = (doc, startY) => {
    let y = startY;
    doc.setFontSize(12);

    doc.text("Instagram Bio:", 10, y);
    y += 10;
    doc.text(`${formData.business} | ${formData.unique}`, 10, y);
    y += 10;

    doc.text("Hashtags:", 10, y);
    y += 10;
    doc.text(`#${formData.niche} #${formData.goal.toLowerCase().replace(" ", "")} #${formData.audience.split(" ")[0]}`, 10, y);
    y += 10;

    doc.text("Messaging:", 10, y);
    y += 10;
    doc.text(`We solve ${formData.problem} for ${formData.audience}.`, 10, y);
    y += 10;

    doc.text("Content Type to Post:", 10, y);
    y += 10;
    doc.text(`${formData.contentType}`, 10, y);
    y += 10;

    doc.text("Content Schedule (5Cs):", 10, y);
    y += 10;
    doc.text("Create: Mon - New post", 10, y);
    y += 10;
    doc.text("Curate: Wed - Share relevant content", 10, y);
    y += 10;
    doc.text("Connect: Fri - Engage followers", 10, y);
    y += 10;

    doc.text("Marketing Strategy:", 10, y);
    y += 10;
    doc.text(`Focus on ${formData.platforms} to ${formData.goal.toLowerCase()}.`, 10, y);

    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, "social-strategy.pdf");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Lato, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#ffffff",
        color: "#64197D",
        padding: "30px 20px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>
          Social Media Strategy Generator
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: "14px" }}>
          Create your custom strategy in minutes!
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        maxWidth: "600px",
        width: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              1. Tell me about your business:
            </label>
            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., Online fitness coaching"
            />
            {errors.business && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              2. Main goal for social media:
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: "white"
              }}
            >
              <option value="">Select...</option>
              <option value="Leads & Sales">Leads & Sales</option>
              <option value="Going Viral & Brand Awareness">Going Viral & Brand Awareness</option>
              <option value="Collaborations & PR">Collaborations & PR</option>
              <option value="Boost Engagement">Boost Engagement</option>
            </select>
            {errors.goal && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              3. Target audience:
            </label>
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., 25-35yo women interested in wellness"
            />
            {errors.audience && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              4. Biggest problem you solve:
            </label>
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., Lack of time for healthy meals"
            />
            {errors.problem && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              5. What makes you unique?
            </label>
            <input
              type="text"
              name="unique"
              value={formData.unique}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., 10-min workout plans"
            />
            {errors.unique && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              6. Favorite content type:
            </label>
            <select
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: "white"
              }}
            >
              <option value="">Select...</option>
              <option value="Long form video">Long form video</option>
              <option value="Short form video">Short form video</option>
              <option value="Photos">Photos</option>
              <option value="Graphics">Graphics</option>
            </select>
            {errors.contentType && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              7. Preferred platforms (e.g., Instagram, TikTok):
            </label>
            <input
              type="text"
              name="platforms"
              value={formData.platforms}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., Instagram, TikTok"
            />
            {errors.platforms && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              8. Products/services to focus on:
            </label>
            <input
              type="text"
              name="products"
              value={formData.products}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., Meal plans, coaching sessions"
            />
            {errors.products && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              9. Your niche and competitors:
            </label>
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="e.g., Fitness, competitors: Fitbit, Peloton"
            />
            {errors.niche && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>
              Upload your logo (optional):
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
            />
          </div>
          <button
            type="button"
            onClick={generatePDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#E11964",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px",
              alignSelf: "center"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E11964")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#E11964")}
          >
            Download Strategy PDF
          </button>
        </form>
      </main>

      {/* Footer with Link */}
      <footer style={{
        backgroundColor: "#eee",
        color: "black",
        padding: "50px 20px",
        textAlign: "center",
        fontSize: "14px"
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Social Media Strategy Generator | By{" "}
          <a
            target="_blank"
            href="https://viralmarketingstars.com"
            style={{
              color: "#E11964",
              textDecoration: "none"
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Viral Marketing Stars®
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;