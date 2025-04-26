const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Function to transcode
function transcodeVideo(inputPath, outputFilename) {

    // Set the input and output file paths
    const outputPath = path.join(__dirname, 'public', 'videos', outputFilename);

    // Transcode with FFmpeg
    ffmpeg(inputPath)
        .output(outputPath)
        .on('start', commandLine => {
            console.log(`FFmpeg process started with command: ${commandLine}`);
        })
        .on('progress', progress => {
            console.log(`Processing: ${progress.percent}% done`);
        })
        .on('end', () => {
            console.log(`Transcoding finished. Output saved to ${outputPath}`);
        })
        .on('error', err => {
            console.log(`Error transcoding the video: ${err}`);
        })
        .run();
    }

const inputPath = path.join(__dirname, 'public', 'videos', 'AmorProhibido.mp4');
const outputFilename = 'transcoded_video.mp4';

transcodeVideo(inputPath, outputFilename);