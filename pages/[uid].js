const UserIdPage = ({ userId }) => (
    <h1>{userId}</h1>
);

export default UserIdPage;

export async function getServerSideProps(context) {
    const { params: { uid } } = context;

    return {
        props: {
            userId: `user-${uid}`
        }
    };
}
