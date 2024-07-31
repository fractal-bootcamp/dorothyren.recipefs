import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
async function main() {
  const user = await client.users.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      clerkId: "clerk123",
    },
  });

  const recipeData = [
    {
      name: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      createdAt: new Date("2022-01-01T10:00:00Z"),
      updatedAt: new Date("2022-01-01T10:00:00Z"),
      user: {
        connect: { id: user.id },
      },
    },
    {
      name: "Chicken Tikka Masala",
      description:
        "Chunks of roasted marinated chicken in a spiced curry sauce.",
      createdAt: new Date("2022-02-01T11:00:00Z"),
      updatedAt: new Date("2022-02-01T11:00:00Z"),
      user: {
        connect: { id: user.id },
      },
    },
    {
      name: "Beef Stroganoff",
      description:
        "A Russian dish of sautéed pieces of beef served in a sauce with smetana (sour cream).",
      createdAt: new Date("2022-03-01T12:00:00Z"),
      updatedAt: new Date("2022-03-01T12:00:00Z"),
      user: {
        connect: { id: user.id },
      },
    },
  ];

  for (const recipe of recipeData) {
    await client.recipe.create({
      data: recipe,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
