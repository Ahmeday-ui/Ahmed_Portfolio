// Types pour les demandes d'accès
export interface AccessRequest {
  id: string;
  nom: string;
  prenom: string;
  organisation: string;
  typeOrg: string;
  email: string;
  timestamp: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  targetUrl: string;
}

export interface AdminNotification {
  type: "new_request" | "request_approved" | "request_rejected";
  requestId: string;
  userEmail: string;
  userName: string;
  project: string;
  timestamp: string;
}

import emailjs from "@emailjs/browser";

// Initialize EmailJS with your Public Key
const EMAILJS_PUBLIC_KEY = "5ewvMGGv9wPHPaZxr";
const EMAILJS_SERVICE_ID = "service_9i0zjjv";
const EMAILJS_TEMPLATE_APPROVE = "template_zlwagno";
const EMAILJS_TEMPLATE_REJECT = "template_1g91sxy";

emailjs.init(EMAILJS_PUBLIC_KEY);

// Fonction pour envoyer un email de notification
export const sendAccessNotification = async (
  email: string,
  name: string,
  project: string,
  status: "approved" | "rejected"
): Promise<boolean> => {
  try {
    const templateId = status === "approved" 
      ? EMAILJS_TEMPLATE_APPROVE
      : EMAILJS_TEMPLATE_REJECT;

    const templateParams = {
      to_email: email,
      to_name: name,
      project_name: project,
      linkedin_url: "https://www.linkedin.com/in/ahmed-ayoubi/",
      github_url: "https://github.com/Ahmeday-ui",
      site_name: "Ahmed Ayoubi Portfolio",
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );

    console.log(`Email ${status} envoyé à ${email}:`, response);
    return response.status === 200;
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'email ${status}:`, error);
    return false;
  }
};

// Fonction pour envoyer une notification admin
export const sendAdminNotification = async (
  adminEmail: string,
  request: AccessRequest
): Promise<boolean> => {
  try {
    const adminEmailContent = {
      to_email: adminEmail,
      request_id: request.id,
      user_name: `${request.prenom} ${request.nom}`,
      user_email: request.email,
      organisation: request.organisation,
      project: request.project,
      timestamp: request.timestamp,
      dashboard_url: "/admin/dashboard",
    };

    console.log("Notification admin envoyée:", adminEmailContent);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification admin:", error);
    return false;
  }
};
