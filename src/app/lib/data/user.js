const users = [
    {
      "user_id": "019a21cf-0762-42af-94ae-d4d2f417883c",
      "email": "alice@example.com",
      "password": "123456",
      "role": "user",
      "created_at": "2024-02-27 21:52:54"
    },
    {
      "user_id": "65a294ee-5345-4eaf-b6d6-4090309cfbdf",
      "email": "bob@example.com",
      "password": "SecurePassword123",
      "role": "user",
      "created_at": "2024-02-27 21:52:54"
    },
    {
      "user_id": "0bb7cdf9-e18c-40c9-ba4e-0b5c0510901b",
      "email": "charlie@example.com",
      "password": "SecurePassword123",
      "role": "user",
      "created_at": "2024-02-27 21:52:54"
    },
    {
      "user_id": "085068ed-1906-4d50-af4f-e13658a0f13f",
      "email": "diana@example.com",
      "password": "SecurePassword123",
      "role": "user",
      "created_at": "2024-02-27 21:52:54"
    }
];
  

export default function fetchUserByEmail(email) {
    return users.find(user => user.email === email);
}





