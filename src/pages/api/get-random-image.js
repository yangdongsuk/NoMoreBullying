export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { type } = req.query;

  console.log("type", type);
  // /api/bullying-bully-response
  if (type === "/api/bullying-bully-response") {
    const randomImage = Math.floor(Math.random() * 19) + 1;
    const imagePath = `/images/angry_karina/${randomImage}.jpg`;

    res.status(200).json({ image: imagePath });
  }
  // /api/bullying-deep-response
  if (
    type === "/api/bullying-deep-response" ||
    type === "/api/bullying-response"
  ) {
    const randomImage = Math.floor(Math.random() * 8) + 1;
    const imagePath = `/images/bully/${randomImage}.jpg`;

    res.status(200).json({ image: imagePath });
  }

  if (type === "/api/programmer-response") {
    const imagePath = `/images/programmer.jpg`;
    res.status(200).json({ image: imagePath });
  }
  // /api/report-response
  if (type === "/api/report-response") {
    const imagePath = `/images/report.jpg`;

    res.status(200).json({ image: imagePath });
  }
  if (type === "/api/counseling-response") {
    const imagePath = `/images/oh.jpg`;

    res.status(200).json({ image: imagePath });
  }
  if (type === "/api/victim-response") {
    const imagePath = `/images/sad.jpg`;

    res.status(200).json({ image: imagePath });
  }

  const randomImage = Math.floor(Math.random() * 19) + 1;
  const imagePath = `/images/happy_karina/${randomImage}.jpg`;

  res.status(200).json({ image: imagePath });
}
