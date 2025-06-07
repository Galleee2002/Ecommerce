import React, { useState, useRef, useEffect } from "react";
import "./contact.scss";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      alert("¡Mensaje enviado correctamente!");
    } catch (error) {
      alert("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactClasses = ["contact", isVisible && "contact--visible", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={contactRef} id="contact" className={contactClasses}>
      <div className="contact__container">
        {/* Header */}
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__title-main">Conectemos</span>
          </h2>
          <p className="contact__subtitle">
            Cuéntanos tu historia y construyamos algo extraordinario juntos
          </p>
        </div>

        {/* Content */}
        <div className="contact__content">
          {/* Contact Info */}
          <div className="contact__info">
            <div className="contact__info-item">
              <div className="contact__info-icon">📍</div>
              <div className="contact__info-text">
                <h4>Ubicación</h4>
                <p>Buenos Aires, Argentina</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📧</div>
              <div className="contact__info-text">
                <h4>Email</h4>
                <p>info@fueradecontexto.com</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">📱</div>
              <div className="contact__info-text">
                <h4>Teléfono</h4>
                <p>+54 11 1234-5678</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact__social">
              <h4>Síguenos</h4>
              <div className="contact__social-links">
                <a href="#" className="contact__social-link">
                  <span>Instagram</span>
                </a>
                <a href="#" className="contact__social-link">
                  <span>Facebook</span>
                </a>
                <a href="#" className="contact__social-link">
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Nombre completo</label>
            </div>

            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Email</label>
            </div>

            <div className="contact__form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Asunto</label>
            </div>

            <div className="contact__form-group contact__form-group--textarea">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="contact__form-textarea"
                placeholder=" "
                rows={6}
                required
              />
              <label className="contact__form-label">Mensaje</label>
            </div>

            <button
              type="submit"
              className="contact__form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="contact__form-spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <span className="contact__form-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
