import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const personalEmail = process.env.PERSONAL_EMAIL;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [personalEmail!],
      subject: `Message from: ${name}`,
      text: message
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
