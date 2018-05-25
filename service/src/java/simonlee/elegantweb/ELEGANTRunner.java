package simonlee.elegantweb;

import simonlee.elegant.ELEGANT;
import simonlee.elegantweb.collector.Collector;
import simonlee.elegantweb.collector.PIssueHandle;
import simonlee.elegantweb.collector.RIssueHandle;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class ELEGANTRunner {

    // ELEGANT information
    public static class APP {
        public static final String NAME        = "ELEGANT Web Tools";
        public static final String DESCRIPTION = "a tool usEd to LocatE fraGmentAtion iNduced compaTibility issues";
        public static final String MAJOR_V     = "1";
        public static final String MINOR_V     = "0";
        public static final String PATCH_V     = "0";
        public static final String VERSION     = MAJOR_V + "." + MINOR_V + "." + PATCH_V;
    }

    // author information
    public static class AUTHOR {
        public static final String NAME = "Simon Lee";
        public static final String EMAIL = "leetsong.lc@gmail.com";
    }

    // a lazy wrapper of ELEGANT and Collector,
    // with only 3 apis - analyse & getResultInString & getResult()
    public static class ELEGANTInstance {
        private ELEGANT elegant;
        private Collector collector;
        private boolean runned;

        private ELEGANTInstance(ELEGANT elegant, Collector collector) {
            this.elegant = elegant;
            this.collector = collector;
        }

        public void analyse() {
            if (!runned) {
                this.elegant.run();
                runned = true;
            }
        }

        public String getResultInString() {
            if (!runned) {
                analyse();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            this.collector.collect(new PrintStream(baos));

            return baos.toString();
        }
    }

    public static ELEGANTInstance buildInstance(String apkPath, String modelsPath, String d3Algo, String platformsPath, boolean verbose) {
        // construct an ELEGANT instance
        ELEGANT.Builder builder = new ELEGANT.Builder();
        ELEGANT elegant = builder
                .withApkPath(apkPath)
                .withModelsPath(modelsPath)
                .withPlatformsPath(platformsPath)
                .withD3Algo(d3Algo)
                .build();

        // watch and report issues
        Collector collector = new Collector(elegant, verbose);
        elegant.watchIssues(new PIssueHandle(collector));
        elegant.watchIssues(new RIssueHandle(collector));

        // return a wrapper instance
        return new ELEGANTInstance(elegant, collector);
    }

}
