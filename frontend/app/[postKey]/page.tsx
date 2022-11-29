export default function postPage({ params }: { params: { postKey: string } }) {
	return <div>{params.postKey}</div>;
}
