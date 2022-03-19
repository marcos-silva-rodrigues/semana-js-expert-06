## Ver info do arquivo
```bash
sox \
  --i \
  "audio/songs/conversation.mp3"
```

## Ver Bit rate do arquivo
```bash
sox \
  --i \
  -B \
  "audio/songs/conversation.mp3"
```

## Converter para ao mesmo bitrate
```bash
sox \
  -v 0.99 \
  -t mp3 \
  "audio/fx/Fart - Gaming Sound Effect (HD) (128 kbps).mp3" \
  -r 48000 \
  -t mp3 \
  "output.mp3"
```

## Concatenar dois audios
```bash
sox \
  -t mp3 \
  -v 0.99 \
  -m "audio/songs/conversation.mp3" \
  -t mp3 \
  -v 0.99 \
  "audio/fx/Fart - Gaming Sound Effect (HD) (128 kbps).mp3" \
  -t mp3 \
  "output.mp3"
```