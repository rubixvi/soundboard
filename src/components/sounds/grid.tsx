import React, { useCallback } from 'react';
import { SoundData } from '@/types';
import { useHotkeys } from '@/hooks/usehotkey';
import { generateSoundId } from '@/utils/sound-id';
import SoundButton from '@/components/sounds/button';
import HotkeyModal from '@/components/modals/hotkey';
import { useAudio } from '@/context/audio';

interface SoundGridProps {
  sounds: SoundData[];
  containerId: string;
}

const SoundGrid: React.FC<SoundGridProps> = ({ sounds: rawSounds, containerId }) => {
  const sounds = rawSounds.map(sound => {
    const soundWithId = {
      ...sound,
      id: sound.id ?? generateSoundId(sound.file)
    };
    return soundWithId;
  });

  const { playSound } = useAudio();

  const handleSoundPlay = useCallback((soundId: string) => {
    const sound = sounds.find(s => s.id === soundId);
    if (sound) {
      playSound(sound.id, sound.file);
    }
  }, [sounds, playSound]);

  const {
    modalOpen,
    currentHotkey,
    showHotkeyModal,
    assignHotkey,
    clearHotkey,
    closeModal
  } = useHotkeys(sounds, handleSoundPlay);

  return (
    <div id={containerId} className="flex flex-wrap gap-1 p-0">
      {sounds.map(sound => (
        <SoundButton
          key={sound.id}
          id={sound.id}
          file={sound.file}
          title={sound.title}
          onHotkeyAssign={showHotkeyModal}
        />
      ))}
      <HotkeyModal
        isOpen={modalOpen}
        onClose={closeModal}
        onClear={clearHotkey}
        currentHotkey={currentHotkey}
        onAssign={assignHotkey}
      />
    </div>
  );
};

export default SoundGrid;
