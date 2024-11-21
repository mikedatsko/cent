import debugSetup from 'debug';
import { uuid, jimp, webp, forms } from 'torque';
import path from 'path';
import fs from 'fs/promises';

const debug = debugSetup('app/src/modules/posts/routes/admin/add-api');

async function addApi(req, res, next) {
  try {
    const db = req.app.get('DB');
    let imageField;
    const { fields, files, fieldsSingle } = await forms.parseForm(req);
    const { postId, title, intro, content, image, isFeatured, isPublished } =
      fieldsSingle;
    const dateNow = new Date().toISOString();
    debug('fields', fields);
    debug('files', files);
    debug('api add post postId:', postId);
    debug('api add post title:', title);
    debug('api add post intro:', intro);
    debug('api add post content:', content);
    debug(
      'api add post isFeatured:',
      isFeatured,
      !!isFeatured,
      typeof isFeatured
    );
    debug('api add post image:', image);
    // const image = Object.fromEntries(files.image);
    // debug('image', image);
    // debug('image', files.image[0]);

    if (!image && files.file.length) {
      debug('filepath', files.file[0].filepath);
      debug('originalFilename', files.file[0].originalFilename);

      const imageId = uuid();
      const oldpath = files.file[0].filepath;
      const filename = files.file[0].originalFilename;

      if (filename) {
        let img;

        if (filename.match(/(\.webp)/gi)) {
          const tempDir = path.join(
            req.__dirname,
            '..',
            'files',
            'images',
            imageId
          );
          // const file = fs.createWriteStream(oldpath);
          // http.get(oldpath, async function(response) {
          //     await response.pipe(file); // Save to tmp.webp
          //     let result = await webp.dwebp(__dirname+"/tmp.webp", __dirname+"/tmp.png", "-o"); // Convert to tmp.webp -> tmp.png
          //     let img = await Jimp.read(__dirname+'/tmp.png') // Read tmp.png for jimp
          //     fs.unlink(__dirname+"/tmp.webp", () => {}); // Remove tmp.webp
          //     fs.unlink(__dirname+"/tmp.png", () => {}); // Remove tmp.png
          //     resolve(img); // Resolve image converted to image/png
          // });
          await fs.mkdir(tempDir, { recursive: true });
          await fs.rename(oldpath, `${tempDir}/tmp.webp`);
          await webp.dwebp(`${tempDir}/tmp.webp`, `${tempDir}/tmp.png`, '-o');
          img = await jimp.read(`${tempDir}/tmp.png`);
          await fs.unlink(`${tempDir}/tmp.webp`);
          await fs.unlink(`${tempDir}/tmp.png`);
          await fs.rm(`${tempDir}`, { recursive: true, force: true });
        } else {
          img = await jimp.read(oldpath);
        }

        // debug('img', img);

        const newpath = path.join(
          req.__dirname,
          '..',
          'files',
          'images',
          imageId,
          'original.png'
        );
        const newpathSmall = path.join(
          req.__dirname,
          '..',
          'files',
          'images',
          imageId,
          'small.png'
        );
        const newpathMedium = path.join(
          req.__dirname,
          '..',
          'files',
          'images',
          imageId,
          'medium.png'
        );
        img
          .write(newpath)
          .resize(800, jimp.AUTO)
          .write(newpathMedium)
          .resize(300, jimp.AUTO)
          .write(newpathSmall);

        debug('oldpath', oldpath);
        debug('newpath', newpath);
        // await fs.rename(oldpath, newpath);
        await db.addOne('file', {
          id: imageId,
          title: filename,
          created: dateNow,
          modified: dateNow
        });
        imageField = imageId;
      } else {
        imageField = '';
      }
    } else {
      imageField = image;
    }

    debug('image', imageField);

    if (postId) {
      await db.updateOne('post', postId, {
        title,
        intro,
        content,
        image: imageField,
        isFeatured: !!isFeatured ? 1 : 0,
        isPublished: !!isPublished ? 1 : 0,
        modified: dateNow
      });
    } else {
      await db.addOne('post', {
        id: uuid(),
        title,
        intro,
        content,
        image: imageField,
        isFeatured: !!isFeatured ? 1 : 0,
        isPublished: !!isPublished ? 1 : 0,
        created: dateNow,
        modified: dateNow
      });
    }

    res.redirect('/admin/posts');
  } catch (err) {
    debug(err);
    res.render('error', { message: err.message, error: err });
  }
}

export default addApi;
