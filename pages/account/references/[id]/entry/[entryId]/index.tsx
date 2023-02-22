const Hello1 = (props: any) => {
  return <div>Entry page {props.id}</div>;
};

export default Hello1;

export async function getServerSideProps({ query }: { query: any }) {
  const id = query.id;

  return {
    props: {
      id: id,
    },
  };
}
