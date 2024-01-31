const UserProfilePage = ({ username }) => (
    <h1>{username}</h1>
);

export default UserProfilePage;

export async function getServerSideProps(context) {
    const { req, res } = context;
    console.log({ req, res });

    return {
        props: {
            username: 'Eric'
        }
    };
}
