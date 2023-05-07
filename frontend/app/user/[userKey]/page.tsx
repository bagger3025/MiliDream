export default async function userPage({
  params,
}: {
  params: { userKey: number };
}) {
  params.userKey = Number(params.userKey);

  return (
    <div>
      <p>현재 userKey: {params.userKey}</p>
    </div>
  );
}
