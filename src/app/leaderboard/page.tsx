import Image from 'next/image';

const LeaderboardPage = () => {
  return (
    <div>

      <div className="w-full">
        <Image 
          src="/images/leaderboard.png" 
          alt="Leaderboard" 
          layout="responsive" 
          width={100} 
          height={50} 
          className="w-[100vw] object-cover"
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
