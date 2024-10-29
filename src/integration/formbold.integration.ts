export async function sendContactMeFormToFormBold(formData: any): Promise<boolean> {
  const FORMBOLD_CONTACTME_FORMID = "6vgbe";

  try {
    await fetch(`https://formbold.com/s/${FORMBOLD_CONTACTME_FORMID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return true;
  } catch (error) {
    console.error("Error sending form to FormBold", error);
    return false;
  }
}