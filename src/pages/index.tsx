// 예시: 다이나믹 라우트 페이지로 이동하는 링크
import Link from 'next/link';

function MyComponent() {
  return (
    <div>
      <Link href="/api/ftp/Obsidian">
        <p>FTP 디렉토리: Obsidian</p>
      </Link>
      <Link href="/api/ftp/QloatMobile_Archive">
        <p>FTP 디렉토리: QloatMobile_Archive</p>
      </Link>
      <Link href="/api/ftp/Obsidian/QloatMobile_Archive">
        <p>FTP 디렉토리: Obsidian/QloatMobile_Archive</p>
      </Link>
      {/* 다른 디렉토리에 대한 링크 추가 */}
    </div>
  );
}

export default MyComponent;
