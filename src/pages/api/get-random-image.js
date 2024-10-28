export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const randomImage = Math.floor(Math.random() * 12) + 1;
  const imagePath = `/images/karina/${randomImage}.jpg`;

  res.status(200).json({ image: imagePath });
}
