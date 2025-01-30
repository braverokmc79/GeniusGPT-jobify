//   model Tour {
//     id String @id @default(uuid())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     city String
//     country String
//     title String
//     description String @db.Text
//     image String? @db.Text
//     stops Json
//     @@unique([city,country])
//   }