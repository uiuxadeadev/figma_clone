import React, { useMemo } from 'react';
import { Avatar } from './Avatar';
import { RoomProvider, useOthers, useSelf } from '../../liveblocks.config';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { generateRandomName } from '@/lib/utils';

function ActiveUsers() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  // memoize the result of this function so that it doesn't change on every render but only when there are new users joining the room
  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = users.length > 2;

    return (
      <div className="flex items-center justify-center gap-1 py-2">
        {currentUser && <Avatar name="You" otherStyles="border-[3px] border-primary-green" />}

        {users.slice(0, 2).map(({ connectionId }) => (
          <Avatar key={connectionId} name={generateRandomName()} otherStyles="-ml-3" />
        ))}

        {hasMoreUsers && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
            +{users.length - 2}
          </div>
        )}
      </div>
    );
  }, [users.length]);

  return memoizedUsers;
}

export default ActiveUsers;
