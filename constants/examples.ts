import { JSONResponse } from "@/types";

export const examples: JSONResponse = {
  header: {
    logo: "medical_logo.png",
    navigationMenuItems: ["Home", "Services", "About", "Blog", "Contact"],
  },
  hero: {
    description: "",
    title: "Welcome to Our Medical Website",
    jumbotron: "medical_hero.jpg",
    cta: "Book an Appointment",
  },
  features: {
    feature_1: {
      title: "Professional Doctors",
      icon: "doctor_icon.png",
      description:
        "We have a team of highly skilled and experienced doctors ready to provide quality medical care.",
    },
    feature_2: {
      title: "State-of-the-art Facilities",
      icon: "facilities_icon.png",
      description:
        "Our medical center is equipped with the latest technology and modern facilities to ensure the best care for our patients.",
    },
    feature_3: {
      title: "Wide Range of Services",
      icon: "services_icon.png",
      description:
        "From general check-ups to specialized treatments, we offer a comprehensive range of medical services to cater to your needs.",
    },
  },
  individualFeatures: {
    feature_1: {
      title: "Telemedicine",
      description:
        "Consult with our doctors from the comfort of your home. Schedule a virtual appointment today.",
      cta: "Learn More",
      backgroundImageDescription: "telemedicine_image.jpg",
    },
    feature_2: {
      title: "Health Blog",
      description:
        "Stay updated with the latest health tips and information from our experts. Read our blog for valuable insights.",
      cta: "Read More",
      backgroundImageDescription: "health_blog_image.jpg",
    },
    feature_3: {
      title: "Patient Portal",
      description:
        "Manage your appointments, access your medical records, and communicate with our medical team securely through our patient portal.",
      cta: "Access Now",
      backgroundImageDescription: "patient_portal_image.jpg",
    },
  },
  testimonials: {
    testimonial_1: {
      name: "John Doe",
      role: "Patient",
      feedback:
        "I received excellent care from the doctors at this medical center. They listened to my concerns and provided effective treatment.",
    },
    testimonial_2: {
      name: "Jane Smith",
      role: "Patient",
      feedback:
        "The staff was friendly and professional. I felt comfortable throughout my visit and would highly recommend this medical center.",
    },
  },
  blog: {
    post_1: {
      title: "10 Tips for Healthy Living",
      shortDescription:
        "Learn how to maintain a healthy lifestyle with these simple yet effective tips.",
    },
    post_2: {
      title: "Understanding Common Illnesses",
      shortDescription:
        "Gain insights into the causes, symptoms, and treatments of common illnesses.",
    },
    post_3: {
      title: "The Importance of Mental Health",
      shortDescription:
        "Discover the significance of mental health and ways to promote emotional well-being.",
    },
  },
  faq: {
    question_1: {
      question: "Do I need to make an appointment?",
      answer:
        "Yes, we recommend making an appointment to ensure timely and personalized care.",
    },
    question_2: {
      question: "What insurances do you accept?",
      answer:
        "We accept a wide range of insurance plans. Please contact our billing department for more information.",
    },
    question_3: {
      question: "What are your working hours?",
      answer:
        "We are open from Monday to Friday, 9 AM to 5 PM. On weekends, we have limited hours of operation.",
    },
  },
  team: {
    member_1: {
      name: "Dr. Emily Johnson",
      role: "Primary Care Physician",
      socialMediaLinks: [
        "facebook.com/dr_emily_johnson",
        "twitter.com/dr_emily_johnson",
        "linkedin.com/in/dr_emily_johnson",
      ],
    },
    member_2: {
      name: "Dr. Michael Smith",
      role: "Specialist",
      socialMediaLinks: [
        "facebook.com/dr_michael_smith",
        "twitter.com/dr_michael_smith",
        "linkedin.com/in/dr_michael_smith",
      ],
    },
    member_3: {
      name: "Dr. Sarah Davis",
      role: "Pediatrician",
      socialMediaLinks: [
        "facebook.com/dr_sarah_davis",
        "twitter.com/dr_sarah_davis",
        "linkedin.com/in/dr_sarah_davis",
      ],
    },
  },
  newsletter: {
    title: "Subscribe to Our Newsletter",
    cta: "Sign Up Now",
  },
  contactForm: {
    nameField: "Your Name",
    emailField: "Your Email",
    messageField: "Your Message",
  },
  map: {
    locationDescription:
      "Visit our medical center at 123 Medical Avenue, City, Country.",
    googleMapsAPIKey: "your_google_maps_api_key",
  },
  footer: {
    socialMediaLinks: [
      "facebook.com/medical_website",
      "twitter.com/medical_website",
      "instagram.com/medical_website",
    ],
  },
};
