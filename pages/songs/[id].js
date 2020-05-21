import {PrismaClient} from '@prisma/client';
import styled from 'styled-components';
import NextLink from 'next/link';
const Container = styled.div`
  padding-top: 10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  position: relative;
`
const Title = styled.h1`
  color: white;
  padding:0px;
`;
const Description = styled.h2`
  color: white;
  font-size: 20px;
  padding:0px;
`;
const LeftBox = styled.div`
  position: absolute;
  top: 115%;
  left: 29%;
  transform: translate(-50%, -50%);
  
`
const BackButton = styled.button`
  margin-top:10px;
  background-color: #f7f7f7;
  color:#005082;
  padding-left:5px;
  padding-right:5px;
  font-size: 20px;
  width: 100px;
  border-radius: 5px;
  box-shadow: 5px 5px 4px #4444dd;
  justify-content:left; 
`

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const song = await prisma.song.findOne({
    include: {Artist:true},
    where: {
      id: Number(params.id)
    }
  });
  return {
    props: {
      song
    }
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany();

  return {
    paths: songs.map((song) => ({
      params: {
        id: song.id.toString()
      }
    })),
    fallback: false
  };
}

export default ({ song }) => (
  <>
    <Container>
      <Title>{song.name}</Title>
      

      <iframe
        width="700px"
        height="400"
        src={`https://www.youtube.com/embed/${song.youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <LeftBox>
        <Description>{song.Artist.name}</Description>
        <NextLink href="/" passHref>
          <BackButton> Back </BackButton>
        </NextLink>
      </LeftBox>
      
    </Container>
    
  </>
);