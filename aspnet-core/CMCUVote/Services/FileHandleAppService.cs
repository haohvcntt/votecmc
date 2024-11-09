using Volo.Abp.Content;

namespace CMCUVote.Services
{
    public class FileHandleAppService : CMCUVoteAppService
    {
        public string UploadFile(IRemoteStreamContent file)
        {
            Stream fs = file.GetStream();
            var id = Guid.NewGuid();
            var fileExtension = Path.GetExtension(file.FileName);
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };

            if (!allowedExtensions.Contains(fileExtension.ToLower()))
            {
                throw new InvalidOperationException("File type not allowed.");
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", id.ToString() + fileExtension);
            using var stream = new FileStream(filePath, FileMode.Create);
            fs.CopyTo(stream);
            return filePath;
        }

        public IRemoteStreamContent DownloadFile(string fileName)
        {
            //find your file with guid or implement your logic 
            //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
            var fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            return new RemoteStreamContent(fs);
        }
    }
}
