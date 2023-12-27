import prisma from "../src/lib/prisma.js";
async function main() {
  const genre = ["كتب", "مقالات", "بودكاست"];
  await Promise.all(
    genre.map((item) =>
      prisma.genre.create({
        data: {
          title: item,
        },
      })
    )
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
